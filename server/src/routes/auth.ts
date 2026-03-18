import { Router, Request, Response } from "express";
import bcyrpt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma'
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router()
// GET /auth/me — verify JWT and return current user
router.get('/me', authMiddleware, async (req:AuthRequest, res:Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: { id: true, name: true, email: true, username: true }
      // never return password
    })
    res.json(user)
  } catch (err) {
    res.status(401).json({ error: 'Not authenticated' })
  }
})
router.post('/register', async (req: Request, res: Response) => {
  try {
    const {name , email, username, password} = req.body
    const existing = await prisma.user.findFirst({
      where: { OR: [{email}, {username}]}
    })

    if(existing) {
      res.status(400).json({error: "Email or username already taken"})
      return
    }
    const hashedPassword = await bcyrpt.hash(password,10)
    const user = await prisma.user.create({
      data: {name, email, username, password: hashedPassword}
    })
    res.status(201).json({message: 'User Created', userId: user.id})
  } catch (err) {
    res.status(500).json({error: "Something went wrong"})
  }
})

router.post('/login', async(req: Request, res: Response) => {
  try{
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({
      where: {email}
    })
    if(!user) {
      res.status(401).json({error: "Invalid Credentials"})
      return
    }
    const valid = await bcyrpt.compare(password, user.password)
    if(!valid) {
      res.status(401).json({error: "Invalid Credentials"})
      return
    }
    await prisma.user.update({
      where: {id: user.id},
      data: {lastLogin: new Date()}
    })

    const token = jwt.sign({userId: user.id}, process.env.SECRET_KEY!, {expiresIn: '15m'})

    res.cookie('token',token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15*60*1000
    })
    
    res.json({message: "Logged in", userId: user.id})

  } catch (err) {
    res.status(500).json({error: "Something went wrong"})
  }
})
router.post('/logout', (req:Request, res: Response) => {
  res.clearCookie('token')
  res.json({message: "Logged out"})
})
export default router
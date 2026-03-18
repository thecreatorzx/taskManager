import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user ?: { userId: number }
}
 export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies.token
  if(!token){
    res.status(401).json({error: 'Not logged in'})
    return 
  }
  try{
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as {userId: number}
    req.user = decoded
    next()
  } catch {
    res.status(401).json({error: "Invalid token"})
  }
 }
import {Router, Response} from 'express'
import prisma from '../lib/prisma'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()

router.use(authMiddleware)

router.get('/', async(req: AuthRequest, res: Response) => {
  try{
    const tasks = await prisma.task.findMany({
      where: {userId: req.user!.userId}
    })
    res.json(tasks)
  } catch(err) {
    res.status(500).json({error: "Something went wrong"})
  }
})

router.get('/:id', async(req:AuthRequest, res:Response) => {
  try{
    const task = await prisma.task.findFirst({
      where: {userId: req.user!.userId, id: Number(req.params.id)}
    })
    if(!task) {
      res.status(404).json({error: "Task not found"})
    }
    res.json(task)
  } catch(err){
    res.status(500).json({error: "Something went wrong"})
  }
})

router.post('/', async( req: AuthRequest, res: Response) => {
  try{
    const { task } = req.body
    const newTask = await prisma.task.create({
      data: {task, userId: req.user!.userId}
    })
    res.status(201).json(newTask)
  } catch {
    res.status(500).json({error: "Something went wrong"})
  }
})

router.put('/:id', async( req: AuthRequest, res: Response) => {
  try{
    const {task, status} = req.body;
    const updated = await prisma.task.updateMany({
      where: {id: Number(req.params.id), userId: req.user!.userId},
      data: { task, status, finishedOn: status === 'completed'? new Date(): null}
    })
    if(updated.count === 0) {
      res.status(404).json({error: 'Task not found'})
      return
    }
    res.json({message:"Task updated"})
  } catch(err){
    res.status(500).json({error: "Something went wrong"})
  }
})

router.delete('/:id', async(req: AuthRequest, res: Response)=> {
  try {
    const deleted = await prisma.task.deleteMany({
      where: {id: Number(req.params.id), userId: req.user!.userId},
    })
    if(deleted.count===0){
      res.status(404).json({error: "Task not found"})
      return 
    }
    res.json({message: "Task deleted"})
  } catch(err) {
    res.status(500).json({error: "Something went wrong"})
  }
})
export default router
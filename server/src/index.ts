import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors"
import authRouter from './routes/auth'
import taskRouter from './routes/tasks'

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use('/auth',authRouter);
app.use('/tasks',taskRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({error: err.message})
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
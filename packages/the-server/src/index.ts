import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cors from 'cors';
import messageRouter from './routers/message-router';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}))
app.use(bodyParser.json())

app.use(messageRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
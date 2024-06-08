import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

let clientList: Array<{ id: number, res: Response }> = [];
const messages: Array<string> = [];

app.use(cors({
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}))
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({});
});

app.get('/connect', (req: Request, res: Response) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  res.write(
    `data: ${JSON.stringify({ messages })}\n\n`
  );

  const id = Date.now();
  const newClient = {
    id,
    res
  };

  clientList.push(newClient);

  req.on('close', () => {
    console.log(`Client ${ id } connection closed`);

    clientList = clientList.filter(client => client.id !== id);
  });
});

app.post('/publish', (req: Request, res: Response) => {
  console.log(req.body)

  const { message } = req.body;

  messages.push(message);

  clientList.forEach((client) => client.res.write(
    `data: ${JSON.stringify({ message })}\n\n`
  ));

  res.status(200).json({ messages });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
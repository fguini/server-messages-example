import { Router, type Request, type Response } from 'express';
import messageObserver from '../features/message-observer';

const router = Router();

router
  .get('/connect', (request: Request, response: Response) => {
    response.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    const id = messageObserver.subscribe(response);

    request.on('close', () => {
      console.log(`Client ${ id } connection closed`);

      messageObserver.unsubscribe(id);
    });
  })
  .post('/publish', (request: Request, response: Response) => {
    const { message } = request.body;

    if(!message) {
      response.status(400).json({ error: 'Message should not be empty' });

      return;
    }

    messageObserver.publish(message);

    response.status(200).end();
  });

export default router;
import type { Response } from 'express';

type MessageClient = { id: number, response: Response };
type Message = string;

function parseWriteData(data: { [key: string]: any }) {
  return `data: ${JSON.stringify(data)}\n\n`
}

class MessageObserver {
  private clients: Array<MessageClient> = [];
  private messages: Array<Message> = [];

  subscribe(response: Response) {
    const id = Date.now();
    this.clients.push({ id, response });

    response.write(
      parseWriteData({ messages: this.messages })
    );

    return id;
  }

  unsubscribe(id: number) {
    this.clients = this.clients.filter(client => client.id !== id);
  }

  private sendToClients(message: Message) {
    this.clients.forEach((client) => {
      client.response.write(
        parseWriteData({ message })
      )
    });
  }

  publish(message: Message) {
    this.messages.push(message);

    this.sendToClients(message);
  }
}

const observer = new MessageObserver();

export default observer;
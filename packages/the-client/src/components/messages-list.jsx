import { useEffect, useState } from 'react';
import { connect } from '../services/messages-event-source-service.js';

export function MessagesList() {
  const [ messages, setMessages ] = useState([]);

  useEffect( () => {
    const events = connect();

    events.onmessage = (event) => {
      const { message, messages } = JSON.parse(event.data);
      const newMessages = message ? [ message ] : messages;

      setMessages((prevMessages) => [
        ...prevMessages,
        ...newMessages
      ]);
    };

    return () => events.onmessage = null;
  }, [ messages ]);

  return (
    <textarea
        readOnly
        rows={ 20 }
        style={{ width: '20rem' }}
        value={ messages.join('\n') }
    />
  )
}
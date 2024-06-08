import { useEffect, useState } from 'react'
import './App.css'

let eventSource = null;

function connect() {
  if(!eventSource) {
    eventSource = new EventSource('http://localhost:3000/connect');
  }

  return eventSource;
}


function App() {
  const [ messages, setMessages ] = useState([]);

  useEffect( () => {
    const events = connect();

    events.onmessage = (event) => {
      const { message, messages } = JSON.parse(event.data);

      console.log('receiving messages', { message, messages });

      setMessages((prevMessages) => prevMessages.concat(message ? [ message ] : messages));
    };

    return () => events.onmessage = null;
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = event.target.message.value;

    console.log('sending a message', {
      message
    });

    fetch('http://localhost:3000/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    })
      .then(() => event.target.reset())
      .catch(console.error);
  }

  return (
    <>
      <h1>Server events</h1>
      <div className="card">
        <textarea readOnly rows={20} style={{ width: '20rem' }} value={ messages.join('\n') }></textarea>
      </div>
      <form onSubmit={ handleSubmit }>
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default App

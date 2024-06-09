import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MessagesList } from './components/messages-list.jsx';
import { SendMessageForm } from './components/send-message-form.jsx';
import './App.css'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={ queryClient }>
      <h1>Server events</h1>
      <div className="card">
        <MessagesList />
      </div>
      <SendMessageForm />
    </QueryClientProvider>
  )
}

export default App

export async function sendMessageService(message) {
  if (!message) {
    throw Error('Message should not be empty');
  }

  const response = await fetch('http://localhost:3000/publish', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  return response.json();
}
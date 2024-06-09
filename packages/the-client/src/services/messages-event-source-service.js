let eventSource = null;

export function connect() {
  if (!eventSource) {
    eventSource = new EventSource('http://localhost:3000/connect');
  }

  return eventSource;
}
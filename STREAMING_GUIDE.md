# Streaming with Vercel AI Protocol

## Backend Server

The FastAPI server now supports streaming via the Vercel AI SDK protocol.

### Endpoints

1. **`POST /chat`** - Streaming endpoint (Vercel AI protocol)
   - Compatible with `useChat` hook from Vercel AI SDK
   - Server-Sent Events (SSE) streaming

2. **`POST /query`** - Non-streaming endpoint (legacy)
   - Returns complete response with trace

## Running the Server

```bash
source .venv/bin/activate
cd backend
uvicorn server:app --reload
```

Server runs at: `http://localhost:8000`

## Frontend Integration

### Install Vercel AI SDK

```bash
cd frontend
npm install ai
```

### Example Usage with useChat Hook

```typescript
import { useChat } from 'ai/react';

function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: 'http://localhost:8000/chat',
  });

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          <strong>{m.role}:</strong> {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

### Example with fetch API

```javascript
const response = await fetch('http://localhost:8000/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'I am feeling tired. Can you help?' }
    ]
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  console.log('Received chunk:', chunk);
}
```

## Testing the Streaming Endpoint

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "I am feeling tired. Can you recommend some content?"}
    ]
  }'
```

## Features

- ✅ Real-time streaming responses
- ✅ CORS enabled for frontend communication
- ✅ Vercel AI SDK compatible
- ✅ Works with `useChat` hook
- ✅ Supports tool calls and agent interactions
- ✅ Backward compatible with non-streaming `/query` endpoint

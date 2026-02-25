# Quick Start Guide

## Project Structure

```
pydantic-demo/
├── backend/
│   ├── agents/
│   ├── models/
│   ├── tools/
│   ├── system_prompts/
│   ├── main.py
│   ├── config.py
│   └── server.py          # FastAPI server with streaming
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx   # Chat component with useChat hook
│   │   │   └── Chat.css   # Chat styling
│   │   ├── App.jsx        # Main app
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
└── .venv/                 # Python virtual environment
```

## Running the Application

### 1. Start the Backend Server

```bash
# From project root
source .venv/bin/activate
cd backend
uvicorn server:app --reload
```

Backend runs at: **http://localhost:8000**

### 2. Start the Frontend

Open a new terminal:

```bash
# From project root
cd frontend
npm run dev
```

Frontend runs at: **http://localhost:5173**

## Features

### Backend
- ✅ FastAPI server with CORS enabled
- ✅ `/chat` endpoint with Vercel AI streaming protocol
- ✅ `/query` endpoint for non-streaming requests
- ✅ Integration with your AI agent and tools

### Frontend
- ✅ React + Vite application
- ✅ Chat interface using Vercel AI SDK
- ✅ Real-time streaming responses
- ✅ Clean, modern UI with animations
- ✅ Loading states and message history

## Testing

1. Open http://localhost:5173 in your browser
2. Type a message like "I'm feeling tired. Can you recommend some content?"
3. Watch the AI agent respond in real-time with streaming

## API Endpoints

- `GET /` - API status
- `GET /health` - Health check
- `POST /query` - Non-streaming query endpoint
- `POST /chat` - Streaming chat endpoint (Vercel AI protocol)

## Technologies

**Backend:**
- FastAPI
- Pydantic AI
- Uvicorn
- Vercel AI Protocol

**Frontend:**
- React 18
- Vite
- Vercel AI SDK
- Modern CSS with animations

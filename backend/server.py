from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from pydantic import BaseModel
from pydantic_ai.ui.vercel_ai import VercelAIAdapter
from agents.orchestrator import build_orchestrator
from models.trace import AgentTrace

app = FastAPI(title="AI Agent API")

# Configure CORS to allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port + React default
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the agent once on startup
agent = build_orchestrator()


class QueryRequest(BaseModel):
    query: str


class QueryResponse(BaseModel):
    response: str
    trace: dict | None = None


@app.get("/")
async def root():
    return {"message": "AI Agent API is running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.post("/query", response_model=QueryResponse)
async def process_query(request: QueryRequest):
    """
    Process a user query through the AI agent and return the response.
    """
    try:
        trace = AgentTrace()

        # Run the agent with the user query
        result = agent.run_sync(request.query, deps=trace)

        trace.final_output = result.output

        return QueryResponse(
            response=result.output,
            trace=trace.model_dump()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")


@app.post("/chat")
async def chat_stream(request: Request):
    """
    Streaming endpoint using Vercel AI protocol.
    Compatible with Vercel AI SDK useChat hook.
    """
    return await VercelAIAdapter.dispatch_request(request, agent=agent)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

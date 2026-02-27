from pydantic_ai import Agent
from config import build_openrouter_model
from system_prompts.orchestrator import ORCHESTRATOR_SYSTEM_PROMPT
from tools.content_tools import register_content_tools
from models.trace import AgentTrace

MODEL_NAME = "qwen/qwen3.5-35b-a3b"

def build_orchestrator() -> Agent:
    model = build_openrouter_model(MODEL_NAME)

    orchestrator = Agent[AgentTrace](
        model=model,
        system_prompt=ORCHESTRATOR_SYSTEM_PROMPT,
    )

    register_content_tools(orchestrator)

    return orchestrator
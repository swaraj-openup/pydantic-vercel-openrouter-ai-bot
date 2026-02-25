from pydantic_ai import Agent
from config import build_openrouter_model
from system_prompts.orchestrator import CONTENT_RECOMMENDER_PROMPT

MODEL_NAME = "anthropic/claude-sonnet-4-5"

def build_content_recommender() -> Agent:
    model = build_openrouter_model(MODEL_NAME)
    return Agent(
        model=model,
        system_prompt=CONTENT_RECOMMENDER_PROMPT,
    )
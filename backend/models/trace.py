from typing import Any, Dict, List
from pydantic import BaseModel, Field


class ToolCallTrace(BaseModel):
    tool_name: str
    input: Dict[str, Any]
    output_preview: str | None = None


class AgentTrace(BaseModel):
    detected_intent: str | None = None
    tools_called: List[ToolCallTrace] = Field(default_factory=list)
    final_output: str | None = None
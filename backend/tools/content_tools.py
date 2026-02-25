from pydantic_ai import RunContext
from agents.content_recommender import build_content_recommender
from models.trace import AgentTrace, ToolCallTrace


content_recommender_agent = build_content_recommender()


def register_content_tools(orchestrator_agent):
    @orchestrator_agent.tool
    def contentRecommender(
        ctx: RunContext[AgentTrace],
        query: str,
        language: str,
    ) -> str:

        result = content_recommender_agent.run_sync(
            f"User query: {query}\nLanguage: {language}"
        )

        # Record trace
        ctx.deps.tools_called.append(
            ToolCallTrace(
                tool_name="contentRecommender",
                input={"query": query, "language": language},
                output_preview=result.output[:200],
            )
        )

        return result.output
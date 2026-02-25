from agents.orchestrator import build_orchestrator
from models.trace import AgentTrace


def main():
    agent = build_orchestrator()

    trace = AgentTrace()

    user_query = (
        "I'm feeling tired. Can you recommend some content "
        "for me to read in English about wellbeing?"
    )

    result = agent.run_sync(user_query, deps=trace)

    trace.final_output = result.output

    print("\n=== FINAL RESPONSE ===")
    print(result.output)

    print("\n=== TRACE ===")
    print(trace.model_dump_json(indent=2))


if __name__ == "__main__":
    main()
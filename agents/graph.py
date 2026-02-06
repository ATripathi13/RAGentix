from langgraph.graph import StateGraph, END
from agents.state import AgentState
from agents.retriever import retriever_agent
from agents.analyzer import analyzer_agent
from agents.answer import answer_agent

def create_graph():
    workflow = StateGraph(AgentState)

    # Add nodes
    workflow.add_node("retrieve", retriever_agent)
    workflow.add_node("analyze", analyzer_agent)
    workflow.add_node("generate", answer_agent)

    # Set entry point
    workflow.set_entry_point("retrieve")

    # Add edges
    workflow.add_edge("retrieve", "analyze")

    def decide_next(state: AgentState):
        return state["next_step"]

    workflow.add_conditional_edges(
        "analyze",
        decide_next,
        {
            "retrieve": "retrieve",
            "generate": "generate"
        }
    )

    workflow.add_edge("generate", END)

    return workflow.compile()

graph = create_graph()

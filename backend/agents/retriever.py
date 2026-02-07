from agents.state import AgentState
from rag import RAGPipeline

def retriever_agent(state: AgentState):
    """Retrieve relevant documents based on the query."""
    print("---RETRIEVING DOCUMENTS---")
    query = state["query"]
    config = state.get("config", {})
    
    rag_pipeline = RAGPipeline(
        openai_api_key=config.get("openai_api_key"),
        qdrant_url=config.get("qdrant_url"),
        qdrant_api_key=config.get("qdrant_api_key")
    )
    
    docs = rag_pipeline.retrieve(query)
    doc_texts = [doc.page_content for doc in docs]
    
    return {
        "retrieved_docs": doc_texts,
        "next_step": "analyze"
    }

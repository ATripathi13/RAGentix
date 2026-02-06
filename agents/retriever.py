from agents.state import AgentState
from rag import RAGPipeline

rag_pipeline = RAGPipeline()

def retriever_agent(state: AgentState):
    """Retrieve relevant documents based on the query."""
    print("---RETRIEVING DOCUMENTS---")
    query = state["query"]
    docs = rag_pipeline.retrieve(query)
    doc_texts = [doc.page_content for doc in docs]
    
    return {
        "retrieved_docs": doc_texts,
        "next_step": "analyze"
    }

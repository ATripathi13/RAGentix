from agents.state import AgentState
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from core.config import settings

model = ChatOpenAI(model=settings.MODEL_NAME)

def answer_agent(state: AgentState):
    """Generate the final answer based on context and analysis."""
    print("---GENERATING ANSWER---")
    query = state["query"]
    docs = state["retrieved_docs"]
    
    prompt = ChatPromptTemplate.from_template(
        "You are a helpful assistant. Use the following pieces of context to answer the user's question. "
        "If you don't know the answer, just say that you don't know, don't try to make up an answer."
        "\n\nContext: {context}\n\nQuestion: {query}\n\nAnswer:"
    )
    
    chain = prompt | model
    response = chain.invoke({"context": "\n".join(docs), "query": query})
    
    return {
        "answer": response.content,
        "next_step": "end"
    }

from agents.state import AgentState
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from core.config import settings

def analyzer_agent(state: AgentState):
    """Analyze the retrieved documents and decide if more info is needed or if we can answer."""
    print("---ANALYZING CONTENT---")
    query = state["query"]
    docs = state["retrieved_docs"]
    config = state.get("config", {})
    
    model = ChatOpenAI(
        model=settings.MODEL_NAME,
        openai_api_key=config.get("openai_api_key") or settings.OPENAI_API_KEY
    )
    
    prompt = ChatPromptTemplate.from_template(
        "You are an analyzer. Given the user query and the retrieved context, decide if there is enough information to answer. "
        "If yes, set next_step to 'generate'. If no, and we haven't retried too much, set next_step to 'retrieve'. "
        "If we are stuck, set next_step to 'generate' with what we have."
        "\n\nContext: {context}\n\nQuery: {query}\n\nResponse format: Just the words 'generate' or 'retrieve'."
    )
    
    chain = prompt | model
    response = chain.invoke({"context": "\n".join(docs), "query": query})
    
    next_action = response.content.strip().lower()
    if 'generate' in next_action:
        next_step = "generate"
    else:
        next_step = "retrieve"

    return {
        "analysis": response.content,
        "next_step": next_step
    }

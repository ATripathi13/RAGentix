from typing import List, TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage

class AgentState(TypedDict):
    query: str
    history: List[BaseMessage]
    retrieved_docs: List[str]
    analysis: str
    answer: str
    next_step: str
    retry_count: int
    config: dict

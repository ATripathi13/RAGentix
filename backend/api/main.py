import time
from fastapi import FastAPI, UploadFile, File, Header, Request
from pydantic import BaseModel
from typing import Optional
from backend.rag import RAGPipeline
from backend.agents.graph import graph
from backend.evaluation.engine import EvaluationEngine
from backend.core.config import settings

app = FastAPI(title="GenAI System API")

class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    answer: str
    metadata: dict

@app.post("/ask", response_model=QueryResponse)
async def ask_agent(
    request: QueryRequest,
    x_openai_api_key: Optional[str] = Header(None),
    x_qdrant_url: Optional[str] = Header(None),
    x_qdrant_api_key: Optional[str] = Header(None)
):
    start_time = time.time()
    
    # Initialize RAG and Eval with dynamic keys
    rag = RAGPipeline(
        openai_api_key=x_openai_api_key,
        qdrant_url=x_qdrant_url,
        qdrant_api_key=x_qdrant_api_key
    )
    eval_engine = EvaluationEngine(openai_api_key=x_openai_api_key)
    
    # Run the agent graph with dynamic config in state
    initial_state = {
        "query": request.query,
        "history": [],
        "retrieved_docs": [],
        "analysis": "",
        "answer": "",
        "next_step": "",
        "retry_count": 0,
        "config": {
            "openai_api_key": x_openai_api_key,
            "qdrant_url": x_qdrant_url,
            "qdrant_api_key": x_qdrant_api_key
        }
    }
    
    result = graph.invoke(initial_state)
    
    latency = time.time() - start_time
    
    # Run evaluation
    eval_results = eval_engine.run_eval(
        query=request.query,
        answer=result["answer"],
        context="\n".join(result["retrieved_docs"]),
        latency=latency
    )
    
    return {
        "answer": result["answer"],
        "metadata": eval_results
    }

@app.post("/upload-doc")
async def upload_document(
    file: UploadFile = File(...),
    x_openai_api_key: Optional[str] = Header(None),
    x_qdrant_url: Optional[str] = Header(None),
    x_qdrant_api_key: Optional[str] = Header(None)
):
    rag = RAGPipeline(
        openai_api_key=x_openai_api_key,
        qdrant_url=x_qdrant_url,
        qdrant_api_key=x_qdrant_api_key
    )
    # Save file temporarily and process
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as f:
        f.write(await file.read())
    
    try:
        num_chunks = rag.ingest_file(temp_path)
        return {"filename": file.filename, "chunks_added": num_chunks}
    finally:
        import os
        if os.path.exists(temp_path):
            os.remove(temp_path)

@app.get("/health")
def health_check():
    return {"status": "ok"}

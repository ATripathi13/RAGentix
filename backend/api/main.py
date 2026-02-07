import time
from fastapi import FastAPI, UploadFile, File, HTTPError
from pydantic import BaseModel
from rag import RAGPipeline
from agents.graph import graph
from evaluation.engine import EvaluationEngine
from core.config import settings

app = FastAPI(title="GenAI System API")
rag = RAGPipeline()
eval_engine = EvaluationEngine()

class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    answer: str
    metadata: dict

@app.post("/ask", response_model=QueryResponse)
async def ask_agent(request: QueryRequest):
    start_time = time.time()
    
    # Run the agent graph
    initial_state = {
        "query": request.query,
        "history": [],
        "retrieved_docs": [],
        "analysis": "",
        "answer": "",
        "next_step": "",
        "retry_count": 0
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
async def upload_document(file: UploadFile = File(...)):
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

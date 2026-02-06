import time
from typing import Dict
from numpy import dot
from numpy.linalg import norm
from rag.vector_store import VectorStoreManager

vector_store = VectorStoreManager()

class EvaluationEngine:
    def calculate_relevance(self, query: str, answer: str) -> float:
        """Calculate cosine similarity between query and answer embeddings."""
        q_emb = vector_store.embeddings.embed_query(query)
        a_emb = vector_store.embeddings.embed_query(answer)
        
        cos_sim = dot(q_emb, a_emb) / (norm(q_emb) * norm(a_emb))
        return float(cos_sim)

    def calculate_faithfulness(self, context: str, answer: str) -> float:
        """Simple overlap or semantic check for faithfulness."""
        # This can be enhanced with an LLM-based judge
        # For now, a placeholder check or basic overlap
        return 0.8  # Placeholder

    def run_eval(self, query: str, answer: str, context: str, latency: float) -> Dict:
        relevance = self.calculate_relevance(query, answer)
        faithfulness = self.calculate_faithfulness(context, answer)
        
        # confidence = 0.4 * retrieval_score + 0.4 * answer_similarity + 0.2 * tool_success
        confidence = 0.4 * 0.9 + 0.4 * relevance + 0.2 * 1.0 # Placeholder for tool/retrieval
        
        return {
            "relevance": relevance,
            "faithfulness": faithfulness,
            "confidence": confidence,
            "latency": latency
        }

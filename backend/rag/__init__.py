from typing import List
from langchain.schema import Document
from rag.processor import DocumentProcessor
from rag.vector_store import VectorStoreManager

class RAGPipeline:
    def __init__(self, collection_name: str = "genai_docs", openai_api_key: str = None, qdrant_url: str = None, qdrant_api_key: str = None):
        self.processor = DocumentProcessor()
        self.vector_store = VectorStoreManager(
            collection_name=collection_name,
            openai_api_key=openai_api_key,
            qdrant_url=qdrant_url,
            qdrant_api_key=qdrant_api_key
        )

    def ingest_file(self, file_path: str):
        """Process and store a file in the vector database."""
        documents = self.processor.process_file(file_path)
        self.vector_store.add_documents(documents)
        return len(documents)

    def retrieve(self, query: str, k: int = 5) -> List[Document]:
        """Retrieve relevant context for a query."""
        return self.vector_store.similarity_search(query, k=k)

    def get_context_text(self, query: str, k: int = 5) -> str:
        """Retrieve context and format as a string."""
        docs = self.retrieve(query, k=k)
        return "\n\n".join([doc.page_content for doc in docs])

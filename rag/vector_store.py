import os
from typing import List
from qdrant_client import QdrantClient
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Qdrant
from langchain.schema import Document
from dotenv import load_dotenv

load_dotenv()

class VectorStoreManager:
    def __init__(self, collection_name: str = "genai_docs"):
        self.client = QdrantClient(
            url=os.getenv("QDRANT_URL", "http://localhost:6333"),
            api_key=os.getenv("QDRANT_API_KEY"),
        )
        self.embeddings = OpenAIEmbeddings(
            model="text-embedding-3-large"
        )
        self.collection_name = collection_name
        self.vector_store = None

    def add_documents(self, documents: List[Document]):
        """Embed and add documents to Qdrant."""
        self.vector_store = Qdrant.from_documents(
            documents,
            self.embeddings,
            url=os.getenv("QDRANT_URL", "http://localhost:6333"),
            api_key=os.getenv("QDRANT_API_KEY"),
            collection_name=self.collection_name,
            force_recreate=False
        )
        return self.vector_store

    def get_retriever(self, k: int = 5, search_type: str = "mmr"):
        """Return a retriever object with MMR or similarity search."""
        if not self.vector_store:
            self.vector_store = Qdrant(
                client=self.client,
                collection_name=self.collection_name,
                embeddings=self.embeddings
            )
            
        return self.vector_store.as_retriever(
            search_type=search_type,
            search_kwargs={"k": k}
        )

    def similarity_search(self, query: str, k: int = 5) -> List[Document]:
        """Perform a simple similarity search."""
        if not self.vector_store:
            self.vector_store = Qdrant(
                client=self.client,
                collection_name=self.collection_name,
                embeddings=self.embeddings
            )
        return self.vector_store.similarity_search(query, k=k)

# RAGentix: Production-Ready GenAI Platform

RAGentix is a scalable, knowledge-powered AI agent platform built with FastAPI, LangGraph, and Qdrant.

## 🚀 Key Features
- **RAG Pipeline**: Advanced document processing and retrieval using Qdrant.
- **AI Agents**: Stateful orchestration with LangGraph (Retriever, Analyzer, Answer agents).
- **Evaluation Framework**: Built-in metrics for Relevance, Faithfulness, and Confidence.
- **Production Ready**: Dockerized with support for Postgres, Redis, and Qdrant.

## 🛠 Tech Stack
- **Backend**: FastAPI
- **AI**: LangGraph, langchain-openai
- **Database**: Qdrant (Vector), PostgreSQL (Relational)
- **Cache**: Redis
- **Containerization**: Docker

## 🛠 Getting Started

### Prerequisites
- Docker & Docker Compose
- OpenAI API Key

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ATripathi13/RAGentix.git
   cd RAGentix
   ```
2. Create a `.env` file based on `.env.example`.
3. Start the system:
   ```bash
   docker-compose up --build
   ```

### API Endpoints
- `POST /ask`: Query the agent system.
- `POST /upload-doc`: Upload PDFs or TXT files for knowledge ingestion.
- `GET /health`: Health check.

## 📈 Evaluation Metrics
The system automatically evaluates every response:
- **Relevance**: Cosine similarity between query and answer.
- **Faithfulness**: LLM-verified consistency with context.
- **Confidence**: Weighted score based on retrieval and answer quality.

## ☁️ Deployment
Ready for deployment on AWS using ECS (API) and RDS (Postgres).

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
2. Setup Backend:
   - Create `backend/.env` from `backend/.env.example` (environment variables are now optional as they can be provided via the UI).
   - Start services:
     ```bash
     docker-compose up --build
     ```
3. Setup Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
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

### Backend (Render)
1. Link your GitHub repository to **Render**.
2. Render will automatically detect `render.yaml` and prompt you to create the Blueprint.
3. **IMPORTANT**: If Render attempts a native Python build and fails, go to the **Settings** tab in the Render dashboard and ensure the **Runtime** (or Environment) is manually set to **Docker**.
4. Sensitive keys like `OPENAI_API_KEY` can be left blank in Render and provided via the frontend **Settings** page.

### Frontend (Vercel)
1. Import the repository into **Vercel**.
2. Set the **Root Directory** to `frontend`.
3. Add the Environment Variable `VITE_API_URL` pointing to your Render backend URL.
4. Deploy!

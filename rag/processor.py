import os
from typing import List
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document

class DocumentProcessor:
    def __init__(self, chunk_size: int = 600, chunk_overlap: int = 60):
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len,
            is_separator_regex=False,
        )

    def process_file(self, file_path: str) -> List[Document]:
        """Process a single PDF or text file into chunks."""
        if file_path.endswith(".pdf"):
            return self._process_pdf(file_path)
        elif file_path.endswith(".txt"):
            return self._process_text(file_path)
        else:
            raise ValueError(f"Unsupported file format: {file_path}")

    def _process_pdf(self, file_path: str) -> List[Document]:
        text = ""
        reader = PdfReader(file_path)
        for page in reader.pages:
            text += page.extract_text()
        
        return self.text_splitter.create_documents(
            [text], 
            metadatas=[{"source": os.path.basename(file_path), "type": "pdf"}]
        )

    def _process_text(self, file_path: str) -> List[Document]:
        with open(file_path, "r", encoding="utf-8") as f:
            text = f.read()
            
        return self.text_splitter.create_documents(
            [text], 
            metadatas=[{"source": os.path.basename(file_path), "type": "txt"}]
        )

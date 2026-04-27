"""
RAG (Retrieval-Augmented Generation) service
"""
import logging
from typing import List, Optional
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from langchain_openai import OpenAIEmbeddings
from app.core.config import settings

logger = logging.getLogger(__name__)


class RAGService:
    """RAG service for retrieving relevant context"""

    def __init__(self):
        """Initialize RAG service"""
        self.client = QdrantClient(url=settings.QDRANT_URL)
        self.embeddings = OpenAIEmbeddings(
            model=settings.OPENAI_EMBEDDING_MODEL,
            api_key=settings.OPENAI_API_KEY,
        )
        self.collection_name = "italian_tutor"
        self._ensure_collection()

    def _ensure_collection(self):
        """Ensure collection exists"""
        try:
            self.client.get_collection(self.collection_name)
        except Exception:
            logger.info(f"Creating collection {self.collection_name}")
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(
                    size=1536,  # text-embedding-3-small dimension
                    distance=Distance.COSINE,
                ),
            )

    def add_document(
        self,
        doc_id: str,
        content: str,
        metadata: dict,
        chunk_size: int = 500,
    ):
        """Add document to vector DB with chunking"""
        try:
            # Split content into chunks
            chunks = self._chunk_text(content, chunk_size)

            points = []
            for i, chunk in enumerate(chunks):
                chunk_id = f"{doc_id}_chunk_{i}"
                embedding = self.embeddings.embed_query(chunk)

                point = PointStruct(
                    id=hash(chunk_id) % (2**31),  # Convert to positive int
                    vector=embedding,
                    payload={
                        "doc_id": doc_id,
                        "chunk_index": i,
                        "content": chunk,
                        **metadata,
                    },
                )
                points.append(point)

            if points:
                self.client.upsert(
                    collection_name=self.collection_name,
                    points=points,
                )
                logger.info(f"Added {len(points)} chunks for document {doc_id}")
        except Exception as e:
            logger.error(f"Error adding document: {e}")
            raise

    def retrieve(
        self,
        query: str,
        top_k: int = 5,
        filters: Optional[dict] = None,
    ) -> List[dict]:
        """Retrieve relevant documents"""
        try:
            query_embedding = self.embeddings.embed_query(query)

            results = self.client.search(
                collection_name=self.collection_name,
                query_vector=query_embedding,
                limit=top_k,
            )

            retrieved = []
            for result in results:
                retrieved.append({
                    "content": result.payload.get("content", ""),
                    "doc_id": result.payload.get("doc_id", ""),
                    "metadata": {
                        k: v for k, v in result.payload.items()
                        if k not in ["content", "doc_id", "chunk_index"]
                    },
                    "score": result.score,
                })

            return retrieved
        except Exception as e:
            logger.error(f"Error retrieving documents: {e}")
            return []

    def _chunk_text(self, text: str, chunk_size: int = 500) -> List[str]:
        """Split text into chunks"""
        chunks = []
        words = text.split()

        current_chunk = []
        current_size = 0

        for word in words:
            current_chunk.append(word)
            current_size += len(word) + 1

            if current_size >= chunk_size:
                chunks.append(" ".join(current_chunk))
                current_chunk = []
                current_size = 0

        if current_chunk:
            chunks.append(" ".join(current_chunk))

        return chunks


# Global RAG service instance
rag_service = RAGService()

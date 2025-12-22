import os
from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader, Docx2txtLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

class RAGSystem:
    def __init__(self, data_dir: str = "./data", persist_dir: str = "./chroma_db"):
        self.data_dir = data_dir
        self.persist_dir = persist_dir
        self.embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        self.vector_store = None
        self._initialize_vector_store()

    def _initialize_vector_store(self):
        """Initializes or loads the vector store."""
        if os.path.exists(self.persist_dir) and os.listdir(self.persist_dir):
            # Load existing
            self.vector_store = Chroma(persist_directory=self.persist_dir, embedding_function=self.embeddings)
        else:
            # Create new if data exists
            self.ingest_data()

    def ingest_data(self):
        """Loads data from data_dir and creates/updates vector store."""
        pdf_loader = DirectoryLoader(self.data_dir, glob="**/*.pdf", loader_cls=PyPDFLoader, show_progress=True)
        docx_loader = DirectoryLoader(self.data_dir, glob="**/*.docx", loader_cls=Docx2txtLoader, show_progress=True)
        # Add text loader if needed, e.g. txt
        
        pdf_docs = []
        docx_docs = []
        
        try:
            pdf_docs = pdf_loader.load()
        except Exception as e:
            print(f"Error loading PDFs: {e}")

        try:
            docx_docs = docx_loader.load()
        except Exception as e:
            print(f"Error loading Docx: {e}")

        docs = pdf_docs + docx_docs
        
        if not docs:
            print("No documents found in data directory.")
            return

        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        splits = text_splitter.split_documents(docs)

        if not splits:
            print("No text splits to index.")
            return

        self.vector_store = Chroma.from_documents(
            documents=splits, 
            embedding=self.embeddings, 
            persist_directory=self.persist_dir
        )
        print(f"Ingested {len(splits)} chunks into vector store.")

    def get_context(self, query: str, k: int = 3) -> str:
        """Retrieves context for a given query."""
        if not self.vector_store:
            # Try re-initializing or re-ingesting if empty
             self._initialize_vector_store()
             if not self.vector_store:
                return ""

        docs = self.vector_store.similarity_search(query, k=k)
        return "\n\n".join([doc.page_content for doc in docs])

    def refresh_data(self):
        """Force refresh of data."""
        self.ingest_data()

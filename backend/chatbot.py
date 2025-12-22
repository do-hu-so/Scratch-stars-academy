from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("API_KEY")

from .rag import RAGSystem

# Initialize global RAG system to avoid reloading on every request
rag_system = RAGSystem(data_dir=os.path.join(os.path.dirname(__file__), "data"), persist_dir=os.path.join(os.path.dirname(__file__), "chroma_db"))

class Chatbot:
    def __init__(self, question: str) -> None:
        self.__question = question

    def gen_ans(self) -> str:
        client = Groq(api_key=api_key) 
        
        # 1. Retrieve context
        context = rag_system.get_context(self.__question)
        
        # 2. Build system prompt with context
        system_content = """Bạn là ScratchBot, trợ lý ảo của Scratch Stars Academy - Học viện công nghệ cho trẻ em.
Nhiệm vụ của bạn là tư vấn về các khóa học, tài liệu giảng dạy và sách lập trình Scratch dựa trên thông tin được cung cấp.
Phong cách: Thân thiện, vui vẻ, cổ vũ tinh thần học tập.
Quan trọng: LUÔN TRẢ LỜI BẰNG TIẾNG VIỆT một cách tự nhiên và chính xác.

Dưới đây là thông tin tham khảo (nếu có) để trả lời câu hỏi:
---------------------
{context}
---------------------
Nếu thông tin bên trên không đủ để trả lời, hãy trả lời dựa trên kiến thức của bạn nhưng vẫn giữ vai trò là ScratchBot.""".format(context=context)

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system", 
                    "content": system_content
                },
                {"role": "user", "content": self.__question}
            ],
            temperature=1,
            max_completion_tokens=1024,
            top_p=1,
            stream=True
        )

        answer = ""  # 👈 gom đáp án

        for chunk in completion:
            content = chunk.choices[0].delta.content
            if content:
                answer += content

        return answer

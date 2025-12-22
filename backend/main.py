from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from .chatbot import Chatbot
app = FastAPI()

# Configure CORS
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello World"}


# Data Models
class Product(BaseModel):
    id: int
    title: str
    type: str
    price: str
    originalPrice: str
    rating: float
    reviews: int
    # image path will be handled on frontend or served as static files
    # For now we will return the image key/name
    image_key: str 
    badge: str
    badgeColor: str

class Resource(BaseModel):
    id: int
    title: str
    description: str
    count: str
    color: str
    # icon will be handled on frontend mapping
    icon_key: str 

class Message(BaseModel):
    name: str
    email: str
    message: str

# Mock Data
products_data = [
  {
    "id": 1,
    "title": "Scratch Cơ Bản - Tập 1",
    "type": "Sách + Video",
    "price": "199,000đ",
    "originalPrice": "299,000đ",
    "rating": 4.9,
    "reviews": 128,
    "image_key": "scratchBook",
    "badge": "Bán chạy",
    "badgeColor": "bg-primary",
  },
  {
    "id": 2,
    "title": "Bộ tài liệu giáo viên",
    "type": "PDF + PowerPoint",
    "price": "349,000đ",
    "originalPrice": "499,000đ",
    "rating": 5.0,
    "reviews": 89,
    "image_key": "scratchBook",
    "badge": "Hot",
    "badgeColor": "bg-destructive",
  },
  {
    "id": 3,
    "title": "Video khóa học đầy đủ",
    "type": "40 video HD",
    "price": "599,000đ",
    "originalPrice": "899,000đ",
    "rating": 4.8,
    "reviews": 256,
    "image_key": "scratchBook",
    "badge": "Giảm 33%",
    "badgeColor": "bg-success",
  },
  {
    "id": 4,
    "title": "Combo Scratch Pro",
    "type": "Sách + Video + Tài liệu",
    "price": "799,000đ",
    "originalPrice": "1,299,000đ",
    "rating": 5.0,
    "reviews": 67,
    "image_key": "scratchBook",
    "badge": "Tiết kiệm",
    "badgeColor": "bg-purple",
  },
]

resources_data = [
  {
    "id": 1,
    "icon_key": "FileText",
    "title": "Giáo án mẫu",
    "description": "Giáo án chi tiết từng buổi học với mục tiêu rõ ràng",
    "count": "25+ giáo án",
    "color": "bg-primary/10 text-primary",
  },
  {
    "id": 2,
    "icon_key": "Presentation",
    "title": "Slide PowerPoint",
    "description": "Bài giảng PowerPoint thiết kế đẹp, dễ sử dụng",
    "count": "50+ slide",
    "color": "bg-secondary/10 text-secondary",
  },
  {
    "id": 3,
    "icon_key": "Video",
    "title": "Video hướng dẫn",
    "description": "Video demo từng bước cho giáo viên xem trước",
    "count": "40+ video",
    "color": "bg-purple/10 text-purple",
  },
]



@app.get("/api/products", response_model=List[Product])
def get_products():
    return products_data

@app.get("/api/resources", response_model=List[Resource])
def get_resources():
    return resources_data

@app.post("/api/messages")
def create_message(message: Message):
    # In a real app, you would save this to a database
    print(f"Received message from {message.name} ({message.email}): {message.message}")
    return {"status": "success", "message": "Message received"}

class ChatRequest(BaseModel):
    question: str

@app.post("/api/chat")
def chat_endpoint(request: ChatRequest):
    try:
        if not request.question:
            return {"answer": "Vui lòng nhập câu hỏi."}
            
        bot = Chatbot(request.question)
        answer = bot.gen_ans()
        return {"answer": answer}
    except Exception as e:
        return {"answer": f"Lỗi: {str(e)}"}

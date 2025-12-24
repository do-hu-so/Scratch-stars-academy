#Web Shop Scratch Stars Academy

Chào mừng bạn đến với **Scratch Stars Academy** - Nền tảng giáo dục lập trình Scratch hàng đầu dành cho trẻ em và giáo viên.

Dự án này là bảng điều khiển và trang web thương mại điện tử tích hợp, cung cấp các khóa học, tài liệu giảng dạy chất lượng cao và hỗ trợ học tập thông qua trợ lý ảo AI thông minh.
Đây là phiên bản 1 với việc chia rõ ràng Backend và Fontend
##  Giới thiệu

**Scratch Stars Academy** được xây dựng với mục tiêu mang lại trải nghiệm học tập và giảng dạy lập trình Scratch tốt nhất. Hệ thống bao gồm:
- **Web App (Frontend):** Giao diện người dùng hiện đại, đẹp mắt, thân thiện với trẻ em và tối ưu cho trải nghiệm mua sắm khóa học.
- **API Server (Backend):** Hệ thống xử lý mạnh mẽ với khả năng tích hợp AI để trả lời câu hỏi tự động.

##  Công nghệ sử dụng

Dự án sử dụng các công nghệ tiên tiến nhất hiện nay để đảm bảo hiệu năng và trải nghiệm người dùng.

### Frontend (Giao diện)
- **Framework:** [React 18](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/) - Tốc độ build và dev server cực nhanh.
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Đảm bảo tính chặt chẽ của mã nguồn.
- **Styling:**
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
  - [shadcn/ui](https://ui.shadcn.com/) - Thư viện component đẹp và linh hoạt.
  - [Framer Motion](https://www.framer.com/motion/) - Tạo hiệu ứng chuyển động mượt mà.
- **State Management:** TanStack Query.

### Backend (Máy chủ & AI)
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) - High performance API framework cho Python.
- **Server:** Uvicorn (ASGI).
- **AI & Data:**
  - **LangChain & RAG:** Hệ thống Retrieval-Augmented Generation để chatbot trả lời dựa trên tài liệu thực tế.
  - **ChromaDB:** Vector Database để lưu trữ và truy vấn ngữ nghĩa.
  - **Pydantic:** Xác thực dữ liệu mạnh mẽ.

##  Cấu trúc dự án

```
e:\START_UP\Scratch-stars-academy\
├── Front_end/              # Mã nguồn giao diện (React + Vite)
│   ├── src/                # Components, Pages, Hooks logic
│   ├── public/             # Tài nguyên tĩnh (ảnh, icon)
│   └── ...config files     # Cấu hình Vite, Tailwind, TypeScript
│
├── backend/                # Mã nguồn máy chủ (Python FastAPI)
│   ├── data/               # Dữ liệu tài liệu cho RAG (PDF/Docx)
│   ├── chroma_db/          # Cơ sở dữ liệu Vector (được tạo tự động)
│   ├── chatbot.py          # Logic xử lý Chatbot AI
│   ├── rag.py              # Logic xử lý RAG System
│   ├── main.py             # Entry point của API Server
│   └── requirements.txt    # Danh sách thư viện Python
│
└── README.md               # Tài liệu hướng dẫn
```

##  Hướng dẫn cài đặt & Chạy ứng dụng

Để chạy toàn bộ hệ thống, bạn cần mở 2 cửa sổ terminal (một cho Frontend, một cho Backend).

### Yêu cầu tiên quyết
- **Node.js** (v18 trở lên) & **npm**.
- **Python** (v3.9 trở lên).

### 1. Khởi chạy Backend (API Server)

Tại thư mục gốc của dự án (`Scratch-stars-academy`), chạy các lệnh sau:

```bash
# Cài đặt các thư viện Python cần thiết
pip install -r backend/requirements.txt

# Khởi động server (Lưu ý: Chạy từ thư mục gốc để tránh lỗi import)
uvicorn backend.main:app --reload
```
Server sẽ khởi chạy tại: `http://127.0.0.1:8000`
- API Docs (Swagger): `http://127.0.0.1:8000/docs`

### 2. Khởi chạy Frontend (Web App)

Mở một terminal mới, điều hướng vào thư mục `Front_end`:

```bash
cd Front_end

# Cài đặt các thư viện Node.js
npm install

# Chạy server development
npm run dev
```
Trang web sẽ khởi chạy tại: `http://localhost:5173` (hoặc port hiển thị trên terminal).

##  API Endpoints chính

Hệ thống Backend cung cấp các API sau:

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/api/products` | Lấy danh sách khóa học và sách. |
| `GET` | `/api/resources` | Lấy danh sách tài liệu cho giáo viên. |
| `POST` | `/api/chat` | Chat với AI Bot (Gửi câu hỏi, nhận câu trả lời). |
| `POST` | `/api/messages` | Gửi tin nhắn liên hệ từ người dùng. |
| `GET` | `/` | Kiểm tra trạng thái server (Health check). |

##  Tính năng nổi bật

1.  ** AI Chatbot thông minh:**
    - Tích hợp công nghệ RAG giúp bot trả lời chính xác dựa trên tài liệu khóa học.
    - Hỗ trợ giải đáp thắc mắc về Scratch cho học viên 24/7.

2.  ** Hệ thống sản phẩm đa dạng:**
    - Hiển thị sách, video khóa học, combo tiết kiệm.
    - Giao diện thẻ sản phẩm (Product Card) chuyên nghiệp với badge, rating và giá.

3.  ** Kho tài liệu giáo viên:**
    - Cung cấp giáo án, slide bài giảng PowerPoint chuyên nghiệp.

4.  ** Giao diện đẳng cấp:**
    - Thiết kế "Youthful & Bright" với tông màu cam-vàng năng động.
    - Tương tác mượt mà (Hover effects, Animations).

---

© 2025 Scratch Stars Academy. All rights reserved.

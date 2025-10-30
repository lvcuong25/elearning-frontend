## E-learning Frontend (React + Vite)

Live demo: https://elearning-frontend-liard.vercel.app/

GitHub (public): https://github.com/lvcuong25/elearning-frontend.git

### 1) Tổng quan
Ứng dụng học trực tuyến gồm danh sách khóa học, chi tiết khóa học, danh sách bài học, theo dõi tiến độ cục bộ, đăng nhập demo, hỗ trợ Dark/Light, và triển khai nhanh trên Vercel.

### Đã thực hiện (ngắn gọn)
- React + TypeScript + Vite, Ant Design + Tailwind utilities
- Router v6, ProtectedRoute, bố cục `LayoutWrapper`
- Auth giả lập (client) + redirect; toast trạng thái
- Danh sách/chi tiết khóa học; mở bài học, tiến độ (localStorage)
- Tìm kiếm + lọc theo cấp độ/loại
- Dark/Light mode (ghi nhớ, đồng bộ AntD), công tắc ở Header
- Tối ưu render: `useMemo`, `useCallback`, `React.memo`
- Xử lý lỗi + loading
- Triển khai Vercel (link ở trên)

### 2) Tech stack
- React 19, TypeScript, Vite
- Ant Design (UI), Tailwind 
- TanStack Query
- Axios

### 3) Tính năng chính
- Đăng nhập demo (client-side) và chuyển hướng sau khi đăng nhập
- Danh sách/chi tiết khóa học, danh sách bài học
- Theo dõi tiến độ bài học lưu localStorage (bắt đầu/đang học/hoàn thành)
- Dark/Light mode: nhớ trạng thái theo localStorage; đồng bộ với Ant Design (dark algorithm)
- Tìm kiếm, lọc theo cấp độ/loại
- Xử lý lỗi và trạng thái loading (Alert/Spin), tối ưu render (useMemo, memo, useCallback)

### 4) Dữ liệu
- Nguồn chính: Firebase Realtime Database (public read)
  - Endpoint đang dùng trong app: `https://e-learning-c2dfe-default-rtdb.asia-southeast1.firebasedatabase.app/courses.json`
  - Cấu trúc trong DB: dữ liệu nằm dưới node `courses` với schema thống nhất cùng app
    ```json
    {
      "courses": [
        {
          "id": 1,
          "title": "IELTS Academic Complete Course",
          "description": "...",
          "thumbnail": "https://...",
          "level": "TC",
          "kindOfCourse": "IELTS",
          "totalLessons": 5,
          "progress": 0,
          "status": "not-started",
          "lessons": [
            { "id": "1", "courseId": "1", "title": "Overview", "duration": 30, "url": "#", "description": "Intro", "status": "not-started", "order": 1 }
          ]
        }
      ]
    }
    ```

### 5) Tài khoản test
- Email: `emily.johnson@x.dummyjson.com`
- Mật khẩu: `emilyspass123`

### 6) Chạy dự án
```bash
npm i
npm run dev
```

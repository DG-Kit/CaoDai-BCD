# Development Roadmap & MVP Phasing Strategy
## Dự án: Ban Chỉnh Đạo Digital Library

| Thông tin | Chi tiết |
| :--- | :--- |
| **Mã tài liệu** | `DOC-PLAN-ROADMAP-001` |
| **Phiên bản** | `1.0.0` |
| **Chiến lược tiếp cận** | **Vertical Slices (Hoàn thành & kiểm thử từng phân hệ trước khi chuyển bước)** |

---

## 🚀 1. Lộ Trình Triển Khai 5 Giai Đoạn (Phased Roadmap)

```mermaid
gantt
    title Lộ Trình Phát Triển Cao Đài Digital Library
    dateFormat  YYYY-MM
    section Giai đoạn 0
    Phase 0 - Project Foundation & Scaffolding     :done, p0, 2026-11, 3w
    section Giai đoạn 1 (Ưu Tiên Số 1)
    Phase 1 - Religious Calendar & Fasting Portal  :active, p1, after p0, 4w
    section Giai đoạn 2
    Phase 2 - Worship Sites & Geographic Map      :p2, after p1, 4w
    section Giai đoạn 3
    Phase 3 - Core Digital Library & Reader       :p3, after p2, 5w
    section Giai đoạn 4
    Phase 4 - Document Composer (Sớ văn, Mẫu in)  :p4, after p3, 4w
    section Giai đoạn 5
    Phase 5 - Research Hub, Glossary & History    :p5, after p4, 5w
```

---

## 📌 2. Chi Tiết Từng Giai Đoạn

### 🟢 Phase 0: Project Foundation (Thiết Lập Nền Tảng)
* **Mục tiêu:** Dựng khung dự án chuẩn mực, cấu hình CI/CD, cơ sở dữ liệu và bảo mật nền tảng.
* **Các thành phần thực hiện:**
  - Khởi tạo monorepo/modular repo với Next.js (Frontend) và NestJS (Backend).
  - Cấu hình PostgreSQL 16 + PostGIS qua Docker Compose.
  - Thiết lập Prisma ORM, migrations nền tảng (`users`, `roles`, `permissions`, `audit_logs`).
  - Triển khai cơ chế xác thực JWT + Scoped RBAC Guard.
  - Tích hợp MinIO Object Storage cho lưu trữ tệp tin.
* **Tiêu chí nghiệm thu (Acceptance Criteria):**
  - Chạy `docker compose up` khởi động đầy đủ Postgres, Redis, MinIO, API và Web thành công.
  - Đăng ký, đăng nhập tài khoản, phân quyền Scoped RBAC hoạt động và có kiểm thử tự động (Unit Test / Integration Test).

---

### 🟡 Phase 1: Religious Calendar & Fasting Management (Phân Hệ Lịch Đạo & Ngày Chay - Ưu Tiên Số 1)
* **Mục tiêu:** Cung cấp công cụ tra cứu lịch Âm – Dương, ngày sóc vọng, các ngày đại lễ vía lớn của Đạo Cao Đài, tùy chọn hiển thị ngày ăn chay (Lục trai, Thập trai, Thiên ngươn) và Can Chi, Giờ Hoàng Đạo.
* **Các tính năng:**
  - **Thuật toán thiên văn:** Tính toán Âm - Dương chuẩn GMT+7 (Hồ Ngọc Đức), Can Chi Ngày/Tháng/Năm, 6 Giờ Hoàng Đạo mỗi ngày.
  - **Quy tắc Trai kỳ:** Tự động tính bù ngày chay khi gặp tháng thiếu (29 ngày).
  - **Backend API:** Endpoint lấy dữ liệu tháng, ngày, danh sách ngày lễ vía.
  - **Giao diện Web Portal:** Bảng lịch tháng di sản êm mắt, bộ lọc bật/tắt ngày chay, Can Chi, Giờ Hoàng Đạo, thẻ chi tiết ngày được chọn.
* **Tiêu chí nghiệm thu:**
  - Chuyển đổi Âm - Dương chuẩn 100%, đánh dấu ngày chay chính xác, hiển thị Can Chi và Giờ Hoàng Đạo mượt mà.

---

### 🔵 Phase 2: Worship Sites & Geographic Map (Thánh Sở & Bản Đồ Họ Đạo)
* **Mục tiêu:** Bản đồ PostGIS định vị Tòa Thánh, Thánh Thất, Điện Thờ Phật Mẫu, Nhà tu thuộc Đạo Cao Đài.

---

### 🟣 Phase 3: Core Digital Library & Reader (Thư Viện Đạo & Bộ Đọc Đối Chiếu)
* **Mục tiêu:** Số hóa, lưu trữ và tra cứu Kinh Cúng Tứ Thời, Quan Hôn Tang Tế, Thánh Ngôn, Thánh Giáo kèm bản scan gốc đối chiếu (triển khai khi có dữ liệu văn bản kinh sách).

---

### 🔵 Phase 2: Religious Calendar & Temple Management (Lịch Đạo & Bản Đồ Thánh Sở)
* **Mục tiêu:** Xây dựng cầu nối sinh hoạt cộng đồng qua lịch lễ và bản đồ định vị cơ sở thờ tự.
* **Các tính năng:**
  - Thuật toán chuyển đổi âm – dương lịch Việt Nam chuẩn múi giờ `Asia/Ho_Chi_Minh`.
  - Danh mục ngày lễ, ngày vía thường niên của Ban Chỉnh Đạo.
  - Danh mục Họ đạo, Thánh Thất, Nhà tu; lưu lịch sử địa chỉ cũ và mới; tọa độ GPS trên bản đồ MapLibre tương tác.
  - Cơ chế gửi báo sai lệch/đề xuất cập nhật từ đơn vị cơ sở (`UNIT_ADMIN`) qua quy trình xét duyệt.

---

### 🟣 Phase 3: Document Composer (Công Cụ Soạn Sớ Văn & Biểu Mẫu)
* **Mục tiêu:** Chuẩn hóa việc soạn thảo và in ấn các biểu mẫu nghi lễ và hành chánh.
* **Các tính năng:**
  - Quản lý phiên bản mẫu sớ văn được duyệt (Sớ cầu an, cầu siêu, chúc thánh...).
  - Form nhập liệu thông minh (tự động chuyển đổi ngày âm/dương, can chi).
  - Xem trước bản in A4 và xuất file PDF/Word (DOCX) chính xác tuyệt đối.
  - Mã hóa bảo mật thông tin cá nhân gia quyến trong tài khoản cá nhân (`MEMBER`).

---

### ⚪ Phase 4: Research, Learning & Advanced Features (Nghiên Cứu & Trí Tuệ Nhân Tạo)
* **Mục tiêu:** Mở rộng thành trung tâm nghiên cứu học Đạo chuyên sâu.
* **Các tính năng:**
  - Từ điển thuật ngữ Cao Đài, giải nghĩa từ cổ, điển tích điển cố.
  - Dòng thời gian lịch sử (Timeline) và tiểu sử chức sắc tiền bối.
  - Trợ lý AI tra cứu trích dẫn (RAG): Chỉ trả lời dựa trên kho tư liệu Ban Chỉnh Đạo đã được xác minh (`VERIFIED`), bắt buộc kèm trích dẫn số trang/ấn bản, không tự suy đoán.


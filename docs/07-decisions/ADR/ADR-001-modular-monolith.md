# ADR-001: Lựa Chọn Kiến Trúc Modular Monolith Cho Hệ Thống
## Dự án: Ban Chỉnh Đạo Digital Library

| Thông tin | Chi tiết |
| :--- | :--- |
| **Trạng thái** | **ACCEPTED (Đã thống nhất)** |
| **Ngày quyết định** | 2026-11-12 |
| **Người đề xuất** | Solution Architect / Technical Lead |

---

## 1. Ngữ cảnh (Context)
Dự án *Ban Chỉnh Đạo Digital Library* bao gồm nhiều phân hệ nghiệp vụ có mối liên kết chặt chẽ (Thư viện số, Lịch Đạo, Thánh sở, Soạn biểu mẫu). Đội ngũ phát triển cần đảm bảo tốc độ triển khai, chi phí hạ tầng tối ưu, đồng thời duy trì tính toàn vẹn dữ liệu quan hệ ACID giữa các thực thể mà không làm tăng độ phức tạp vận hành.

## 2. Quyết định (Decision)
Hệ thống sẽ được xây dựng theo mô hình **Modular Monolith** bằng NestJS (Backend) và Next.js (Frontend), với một cơ sở dữ liệu PostgreSQL duy nhất ở giai đoạn đầu, thay vì chia nhỏ thành Microservices:
- Các phân hệ được tách thành các NestJS Module độc lập (`library`, `calendar`, `worship-sites`, `composer`, `auth`, `audit`).
- Mỗi module có ranh giới logic rõ ràng (Service, Controller, Repository riêng).
- Giao tiếp giữa các module thông qua Service Interface hoặc Event Bus nội bộ.

## 3. Hệ quả (Consequences)
- **Điểm lợi (Pros):**
  * Dễ triển khai, kiểm thử và debug cục bộ (chỉ cần chạy 1 command qua Docker Compose).
  * Đảm bảo tính toàn vẹn dữ liệu giao dịch (database transaction) khi duyệt xuất bản tài liệu hoặc cập nhật cơ sở.
  * Tiết kiệm chi phí máy chủ và đơn giản hóa quy trình giám sát (monitoring).
- **Hạn chế & Giải pháp (Cons & Mitigation):**
  * Cần kỷ luật cao trong code để tránh việc các module import chéo gây phụ thuộc vòng (circular dependency). Sẽ sử dụng linter và kiểm tra cấu trúc module trong CI/CD.
  * Nếu sau này phân hệ OCR hoặc Composer tạo tải đột biến, có thể dễ dàng tách chúng thành Background Worker độc lập qua BullMQ mà không cần sửa đổi kiến trúc lõi.


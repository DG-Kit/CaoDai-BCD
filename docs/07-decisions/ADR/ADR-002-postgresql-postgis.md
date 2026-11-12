# ADR-002: Lựa Chọn PostgreSQL 16 và PostGIS Cho Lưu Trữ Dữ Liệu & Không Gian
## Dự án: Ban Chỉnh Đạo Digital Library

| Thông tin | Chi tiết |
| :--- | :--- |
| **Trạng thái** | **ACCEPTED (Đã thống nhất)** |
| **Ngày quyết định** | 2026-11-12 |
| **Người đề xuất** | Solution Architect / Database Engineer |

---

## 1. Ngữ cảnh (Context)
Dự án có hai yêu cầu kỹ thuật mang tính đặc thù cao:
1. Quản lý bản đồ các cơ sở thờ tự (Tòa Thánh, Họ đạo, Thánh Thất, Nhà tu) với tọa độ địa lý GPS, truy vấn bán kính tìm kiếm quanh người dùng và hiển thị trên bản đồ số.
2. Tìm kiếm toàn văn (Full-Text Search) nội dung kinh sách bằng tiếng Việt có dấu và không dấu.

## 2. Quyết định (Decision)
Chọn **PostgreSQL 16 kết hợp tiện ích mở rộng PostGIS** làm hệ quản trị cơ sở dữ liệu duy nhất cho giai đoạn MVP:
- Dùng kiểu dữ liệu `GEOMETRY(Point, 4326)` để lưu tọa độ GPS của các cơ sở thờ tự.
- Sử dụng các hàm không gian chuẩn (`ST_DWithin`, `ST_Distance`) để tìm kiếm cơ sở gần nhất.
- Sử dụng kiểu dữ liệu `tsvector` kết hợp chỉ mục GiST/GIN để hỗ trợ tìm kiếm toàn văn tiếng Việt mà chưa cần cài thêm cụm Elasticsearch/MeiliSearch phức tạp.

## 3. Hệ quả (Consequences)
- **Điểm lợi (Pros):**
  * Tối giản hạ tầng: Không cần chạy thêm cụm Database không gian riêng biệt hay Search Engine riêng.
  * Hỗ trợ chuẩn ACID tuyệt đối cho dữ liệu kiểm toán (`audit_logs`) và phân quyền Scoped RBAC.
  * Tương thích hoàn hảo với Prisma ORM và hệ sinh thái Node.js/Docker.
- **Hạn chế:** PostGIS yêu cầu hình ảnh Docker chuyên biệt (`postgis/postgis:16-3.4`), cần cấu hình đúng trong `docker-compose.yml`.


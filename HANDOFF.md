# Project Handoff & Continuity Notes (Chỉ áp dụng qua Git)

> **Dự án:** Ban Chỉnh Đạo Digital Library
> **Workspace:** `CaoDai-BCD`
> **Phương thức chuyển giao:** **100% qua Git & State File** (Theo Nguyên tắc 11 trong [`AGENTS.md`](AGENTS.md))

---

## 1. Trạng thái hiện tại của dự án

### Đã hoàn thành:

- **Tài liệu thỏa thuận & Thiết kế nền tảng ([`AGENTS.md`](AGENTS.md)):**
  - Xác định phạm vi chuyên biệt cho Hội Thánh Cao Đài Ban Chỉnh Đạo (Tòa Thánh Bến Tre).
  - Quy định vai trò hệ thống và cơ chế Scoped RBAC.
  - Phác thảo 6 phân hệ: Thư viện Đạo, Lịch Đạo, Document Composer, Thánh Sở / Bản đồ, Nghiên cứu & Học Đạo, Admin Portal.
  - Quy tắc bảo tồn kinh văn nguyên gốc, bản scan làm đối chiếu, không tự ý sửa đổi dị bản.
  - Quy chuẩn bắt buộc về tính liên tục đa thiết bị qua Git.
- **Cấu hình Repo & Công cụ:**
  - Thiết lập [`.gitignore`](.gitignore) chuẩn cho dự án.
  - Cấu hình các bộ kỹ năng (`speckit-*`, `agy-customizations`).

### Công việc tiếp theo:

1. Xác định kiến trúc kỹ thuật chi tiết (Backend, Frontend, Database PostgreSQL/PostGIS).
2. Xây dựng tài liệu đặc tả chức năng đầu tiên (ví dụ: Phân hệ Thư viện Đạo hoặc Danh mục Thánh sở).
3. Thiết lập khung dự án (project boilerplate/scaffolding) và môi trường kiểm thử.

---

## 2. Quy trình bàn giao sang máy khác (Duy nhất qua Git)

Không sử dụng bất kỳ hình thức copy database/file hệ thống cục bộ nào. Mọi trao đổi đều đồng bộ qua Git:

### Bước 1: Tại máy hiện tại (Trước khi chuyển máy)

Ghi nhận tiến độ và đẩy lên repository:

```powershell
git add .
git commit -m "chore(handoff): update project state and handoff notes"
git push
```

### Bước 2: Tại máy tiếp nhận (Khi tiếp tục công việc)

1. Cập nhật mã nguồn mới nhất:
   ```powershell
   git pull
   ```
2. Mở Antigravity tại thư mục workspace dự án, mở một cuộc trò chuyện mới và gửi câu lệnh:
   > *"Đọc file HANDOFF.md và AGENTS.md để nắm bối cảnh dự án. Báo cáo các công việc tiếp theo và chờ chỉ đạo."*
   >

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
  - Cấu hình và tinh gọn toàn bộ 24 skills về duy nhất thư mục [`.agents/skills/`](.agents/skills) bao gồm đầy đủ các vai trò: BA, Architect, Designer, Developer, QA, QC/Tester và Code Reviewer.
  - Tạo sổ tay hướng dẫn chi tiết tại [`SKILLS_NOTE.md`](SKILLS_NOTE.md).
- **Hoàn thành Rà soát Kick-off & Hệ thống Tài liệu Thiết Kế ([`docs/`](docs)):**
  - Đã lập `BRD.md`, `BUSINESS_RULES.md`, `SYSTEM_ARCHITECTURE.md`, `DATABASE_SCHEMA.md` (22 bảng), `DEVELOPMENT_ROADMAP.md` (5 Phase), và các ADRs (`ADR-001` đến `ADR-005`).
  - **Quyết định đã thông qua:** Sử dụng cấu trúc Monorepo (`apps/api`, `apps/web`, `infra/`), dữ liệu kinh văn sẽ được người dùng cung cấp sau.
  - **Trạng thái hiện tại:** **ON HOLD / WAITING FOR USER SIGNAL** — Đang chờ người dùng kiểm tra xong thiết kế và ra lệnh bắt đầu triển khai Phase 0.

### Công việc tiếp theo (Khi người dùng phê duyệt bắt đầu):

1. **Khởi động Phase 0 (Project Foundation):**
   - Tạo cấu trúc Monorepo (`apps/api`, `apps/web`, `infra`).
   - Cấu hình Docker Compose (PostgreSQL 16 + PostGIS, Redis, MinIO).
   - Thiết lập Prisma Schema nền tảng và chạy migration ban đầu (`users`, `roles`, `permissions`, `audit_logs`).
   - Cấu hình Authentication (JWT) và Scoped RBAC Guard.

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
   > _"Đọc file HANDOFF.md và AGENTS.md và SKILLS_NOTE.md để nắm bối cảnh dự án. Báo cáo các công việc tiếp theo và chờ chỉ đạo."_

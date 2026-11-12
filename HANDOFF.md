# Project Handoff & Continuity Notes (Chỉ áp dụng qua Git)

## 0. Repository scan (2026-11-12)

- Repository hiện là **kho tài liệu thiết kế/cấu hình**, chưa có ứng dụng, package manifest, migration, Docker Compose hoặc mã nguồn sản phẩm.
- Tài liệu chính đã có: `AGENTS.md`, `README.md`, `docs/01-business/BRD.md`, `BUSINESS_RULES.md`, `docs/02-architecture/SYSTEM_ARCHITECTURE.md`, `docs/03-database/DATABASE_SCHEMA.md`, `docs/06-planning/DEVELOPMENT_ROADMAP.md`, ADR-001/002/005, cùng cấu hình Spec Kit và `.agents/skills/`.
- Các nguyên tắc phạm vi, trung lập (không tự nhận chính thức), bảo tồn nguồn và xác minh là ràng buộc nền. Stack/module/roadmap phần lớn là thiết kế; ADR-001 (Modular Monolith), ADR-002 (PostgreSQL 16 + PostGIS) và ADR-005 (monorepo) ghi trạng thái ACCEPTED.
- `BRD.md` và `BUSINESS_RULES.md` vẫn ghi `PROPOSED`; quy tắc trai kỳ/Can Chi mới được thêm ngày 2026-11-12 và cần xác minh nguồn nghiệp vụ trước khi triển khai.
- Git tại lần scan: nhánh `main`, sạch, đồng bộ `origin/main`; commit mới nhất `4bb73ac`.
- Trạng thái hiện hành vẫn **ON HOLD / WAITING FOR USER SIGNAL** theo handoff trước đó. Chưa bắt đầu Phase 0. Bước kế tiếp: chờ chỉ đạo triển khai; khi được yêu cầu, rà lại các tài liệu liên quan và chọn vertical slice nhỏ.

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
  - Đã lập `BRD.md`, `BUSINESS_RULES.md`, `SYSTEM_ARCHITECTURE.md`, `DATABASE_SCHEMA.md` (23 bảng), `DEVELOPMENT_ROADMAP.md` (5 Phase), và các ADRs (`ADR-001` đến `ADR-005`).
  - **Cập nhật mới (2026-11-12):** Bổ sung vào Phân hệ Lịch Đạo nghiệp vụ lựa chọn các ngày ăn chay (Lục trai, Thập trai, Thiên Ngươn) và tùy chọn hiển thị Can Chi (ngày/tháng/năm) tại `BRD.md`, `BUSINESS_RULES.md` (`BR-CAL-03`, `BR-CAL-04`) và `DATABASE_SCHEMA.md` (`user_calendar_preferences`, `event_occurrences`).
  - **Quyết định đã thông qua:** Sử dụng cấu trúc Monorepo (`apps/api`, `apps/web`, `infra/`), dữ liệu kinh văn sẽ được người dùng cung cấp sau.
- **Khởi động Giai đoạn 0 (Phase 0: Project Foundation) — Đang thực hiện:**
  - **Bước 0.1 (Hoàn thành):**
    * Thiết lập Monorepo chuẩn với npm workspaces (`package.json`, `tsconfig.base.json`).
    * Tạo gói thư viện chia sẻ [`packages/shared`](packages/shared) chứa các Enums cốt lõi (`UserRole`, `VerificationStatus`, `DocumentEditionStatus`, `FastingSchedule`...).
    * Thiết lập hạ tầng Docker Compose chuẩn tại [`infra/docker-compose.yml`](infra/docker-compose.yml) (PostgreSQL 16 + PostGIS, Redis 7, MinIO S3).
    * Thiết lập tệp biến môi trường mẫu [`.env.example`](.env.example) và cập nhật [`.gitignore`](.gitignore).
  - **Bước 0.3 (Hoàn thành):**
    * Khởi tạo Frontend Web Boilerplate tại [`apps/web`](apps/web) với Next.js 14 (App Router) + TypeScript + Tailwind CSS.
    * Tích hợp bảng màu di sản theo tiêu chuẩn Art Director (`impeccable`): `heritage-paper`, `heritage-parchment`, `heritage-gold`, `heritage-wood`.
    * Đã khắc phục triệt để lỗi font tách dấu tiếng Việt (thay thế Georgia bằng `Lora` và `Times New Roman` tối ưu glyph tiếng Việt).
    * Đã tinh chỉnh toàn bộ nội dung trang chủ: Loại bỏ toàn bộ các từ ngữ kỹ thuật/developer, thay bằng giao diện đọc tra cứu thuần túy, thân thiện với bạn đọc, tín đồ và nhà nghiên cứu (tìm kiếm kinh sách, lịch sóc vọng ăn chay, danh bạ Thánh Thất, soạn sớ văn gia đạo).
    * Xây dựng layout chính thức gồm thanh thông báo tôn chỉ trung lập ("Bản scan gốc là bằng chứng đối chiếu tối cao"), header điều hướng 6 phân hệ, footer học thuật.
    * Tạo trang chủ Portal ([`apps/web/src/app/page.tsx`](apps/web/src/app/page.tsx)) giới thiệu trực quan 6 phân hệ cốt lõi.
    * Tích hợp widget kiểm tra kết nối API tự động ([`ApiHealthWidget.tsx`](apps/web/src/components/ApiHealthWidget.tsx)) kết nối `GET /api/health` của Backend.
    * Đã xác nhận `npm run build --workspace=@caodai-bcd/web` thành công 100% (tải trang nhẹ ~99.1 kB, chuẩn `vercel-react-best-practices`).
  - **Bước 0.4 (Hoàn thành):**
    * Khởi động thành công hạ tầng Docker Compose tại [`infra/docker-compose.yml`](infra/docker-compose.yml): PostgreSQL 16 kết hợp PostGIS (`postgis/postgis:16-3.4`), Redis 7 (`redis:7-alpine`), MinIO S3 (`pgsty/minio:latest`), và pgAdmin 4 Web (`dpage/pgadmin4:latest` tại cổng 5050).
    * Thiết lập tự động cấu hình sẵn máy chủ PostgreSQL vào pgAdmin 4 qua [`infra/servers.json`](infra/servers.json).
    * Thực thi thành công Prisma Migration ban đầu (`20261112163558_init_auth_schema`) tạo các bảng Scoped RBAC, Audit Log, User Calendar Preferences và PostGIS geometry.
    * Khởi tạo kịch bản Seed data tại [`apps/api/prisma/seed.ts`](apps/api/prisma/seed.ts): Nạp đủ 6 vai trò chuẩn (`VISITOR`, `MEMBER`, `UNIT_ADMIN`, `LIBRARY_EDITOR`, `REVIEWER`, `SYSTEM_ADMIN`), 13 quyền hạn nền tảng và ánh xạ quyền hạn tương ứng.
    * Nâng cấp `HealthController` tích hợp kiểm tra kết nối database thực tế (`$queryRaw SELECT 1`), đo độ trễ truy vấn (latency 8ms) và phản hồi JSON chi tiết.
    * Đã kiểm thử tự động đạt 100% (Jest 3/3 tests passed, Monorepo build `npm run build` thành công cả 3 workspace `@caodai-bcd/api`, `@caodai-bcd/web`, `@caodai-bcd/shared`).
  - **Trạng thái hiện tại:** **PHASE 0: PROJECT FOUNDATION HOÀN TẤT 100%**.

---

## 2. Kế hoạch tiếp theo (Khởi động Phase 1: Core Library)

Theo tài liệu [`DEVELOPMENT_ROADMAP.md`](docs/06-planning/DEVELOPMENT_ROADMAP.md) và [`BRD.md`](docs/01-business/BRD.md), chúng ta sẽ bước vào **Phase 1: Phân hệ Thư Viện Đạo (Core Library)**:

1. **Bước 1.1: Thiết kế Database Schema cho Phân hệ Thư Viện:**
   - Các bảng: `document_categories`, `documents`, `document_editions`, `document_files`, `document_sections`, `document_contents`, `document_sources`.
   - Cơ chế lưu trữ bản scan đối chiếu bất biến (checksum SHA-256), trạng thái xác minh (`VerificationStatus`), và lịch sử sửa đổi.
2. **Bước 1.2: Triển khai Module Thư viện Backend (NestJS):**
   - API CRUD danh mục tác phẩm, ấn bản, tải tệp scan lên MinIO S3, lưu bản văn số hóa song song.
   - Thẩm định và xuất bản ấn bản kinh văn theo quy trình Scoped RBAC.
3. **Bước 1.3: Triển khai Giao diện Thư Viện Frontend (Next.js):**
   - Danh mục phân cấp, bộ lọc tác phẩm, trang chi tiết ấn bản, trình đọc bản văn đối chiếu với scan gốc (Side-by-side reader).

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

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
    - Thiết lập Monorepo chuẩn với npm workspaces (`package.json`, `tsconfig.base.json`).
    - Tạo gói thư viện chia sẻ [`packages/shared`](packages/shared) chứa các Enums cốt lõi (`UserRole`, `VerificationStatus`, `DocumentEditionStatus`, `FastingSchedule`...).
    - Thiết lập hạ tầng Docker Compose chuẩn tại [`infra/docker-compose.yml`](infra/docker-compose.yml) (PostgreSQL 16 + PostGIS, Redis 7, MinIO S3).
    - Thiết lập tệp biến môi trường mẫu [`.env.example`](.env.example) và cập nhật [`.gitignore`](.gitignore).
  - **Bước 0.3 (Hoàn thành):**
    - Khởi tạo Frontend Web Boilerplate tại [`apps/web`](apps/web) với Next.js 14 (App Router) + TypeScript + Tailwind CSS.
    - Tích hợp bảng màu di sản theo tiêu chuẩn Art Director (`impeccable`): `heritage-paper`, `heritage-parchment`, `heritage-gold`, `heritage-wood` cùng bộ 3 màu sắc chủ đạo Tam Giáo Cao Đài (`caodai-yellow`, `caodai-blue`, `caodai-red`).
    - Thay thế toàn bộ biểu tượng Thiên Nhãn bằng bức tranh tả thực chất chì mỹ thuật do người dùng cung cấp (`apps/web/public/images/thien-nhan.jpg`), hiển thị trọn vẹn nét tôn nghiêm của chân mày, mí mắt và đồng tử tại Logo Header, Banner chính và chân trang.
    - **Điều chỉnh định vị hiển thị giao diện (User-Facing Brand):** Layout Web đối ngoại chính thức sử dụng tên **"Thư Viện Số Cao Đài"** (CaoDai Digital Library / Đại Đạo Tam Kỳ Phổ Độ); trong khi đó, phần lõi hệ thống và dữ liệu giai đoạn MVP vẫn giữ nguyên trọng tâm chuyên biệt vào **Hội Thánh Cao Đài Ban Chỉnh Đạo** (Tòa Thánh Bến Tre), sẵn sàng mở rộng các chi phái khác trong tương lai.
    - Thay thế icon nhận diện chính và Favicon trình duyệt từ Thiên Nhãn sang **Cổ Pháp Tam Giáo của Đạo Cao Đài** (Bình Bát Vu, Cây Phất Chủ, Cổ Bút & Kinh Xuân Thu) kết hợp viền Tam Giáo tại [`apps/web/src/components/CoPhap.tsx`](apps/web/src/components/CoPhap.tsx) và [`apps/web/src/app/icon.svg`](apps/web/src/app/icon.svg); giữ nguyên bức họa Thiên Nhãn thiêng liêng ở Hero Section.
    - Khắc phục triệt để lỗi Webpack Persistent Cache trên Windows (`ENOENT: rename 0.pack.gz_ -> 0.pack.gz` gây 500/404 mất CSS khi F5 dev server) bằng cách cấu hình `config.cache = { type: 'memory' }` trong `apps/web/next.config.mjs`.
    - Đã kiểm thử `npm run build --workspace=@caodai-bcd/web` sạch 100%, tải trang ổn định và không bị lỗi vặt.
    - Đã tinh chỉnh toàn bộ nội dung trang chủ: Loại bỏ toàn bộ các từ ngữ kỹ thuật/developer, thay bằng giao diện đọc tra cứu thuần túy, thân thiện với bạn đọc, tín đồ và nhà nghiên cứu (tìm kiếm kinh sách, lịch sóc vọng ăn chay, danh bạ Thánh Thất, soạn sớ văn gia đạo).
    - Xây dựng layout chính thức gồm thanh thông báo tôn chỉ trung lập ("Bản scan gốc là bằng chứng đối chiếu tối cao"), header điều hướng 6 phân hệ, footer học thuật.
    - Tạo trang chủ Portal ([`apps/web/src/app/page.tsx`](apps/web/src/app/page.tsx)) giới thiệu trực quan 6 phân hệ cốt lõi.
    - Tích hợp widget kiểm tra kết nối API tự động ([`ApiHealthWidget.tsx`](apps/web/src/components/ApiHealthWidget.tsx)) kết nối `GET /api/health` của Backend.
    - Đã xác nhận `npm run build --workspace=@caodai-bcd/web` thành công 100% (tải trang nhẹ ~99.1 kB, chuẩn `vercel-react-best-practices`).
  - **Bước 0.4 (Hoàn thành):**
    - Khởi động thành công hạ tầng Docker Compose tại [`infra/docker-compose.yml`](infra/docker-compose.yml): PostgreSQL 16 kết hợp PostGIS (`postgis/postgis:16-3.4`), Redis 7 (`redis:7-alpine`), MinIO S3 (`pgsty/minio:latest`), và pgAdmin 4 Web (`dpage/pgadmin4:latest` tại cổng 5050).
    - Thiết lập tự động cấu hình sẵn máy chủ PostgreSQL vào pgAdmin 4 qua [`infra/servers.json`](infra/servers.json).
    - Thực thi thành công Prisma Migration ban đầu (`20261112163558_init_auth_schema`) tạo các bảng Scoped RBAC, Audit Log, User Calendar Preferences và PostGIS geometry.
    - Khởi tạo kịch bản Seed data tại [`apps/api/prisma/seed.ts`](apps/api/prisma/seed.ts): Nạp đủ 6 vai trò chuẩn (`VISITOR`, `MEMBER`, `UNIT_ADMIN`, `LIBRARY_EDITOR`, `REVIEWER`, `SYSTEM_ADMIN`), 13 quyền hạn nền tảng và ánh xạ quyền hạn tương ứng.
    - Nâng cấp `HealthController` tích hợp kiểm tra kết nối database thực tế (`$queryRaw SELECT 1`), đo độ trễ truy vấn (latency 8ms) và phản hồi JSON chi tiết.
    - Đã kiểm thử tự động đạt 100% (Jest 3/3 tests passed, Monorepo build `npm run build` thành công cả 3 workspace `@caodai-bcd/api`, `@caodai-bcd/web`, `@caodai-bcd/shared`).
  - **Trạng thái hiện tại:** **PHASE 0: PROJECT FOUNDATION HOÀN TẤT 100%**.

---

## 2. Tiến độ Phase 1: Phân Hệ Lịch Đạo & Ngày Chay (Hoàn thành 100%)

Theo kế hoạch chi tiết [`docs/06-planning/PHASE_1_CALENDAR_PLAN.md`](docs/06-planning/PHASE_1_CALENDAR_PLAN.md):

- [x] **Task 1.1 (Hoàn thành):**
  - Xây dựng module thuật toán Âm Dương (chuẩn thiên văn GMT+7 Hồ Ngọc Đức), Can Chi Ngày/Tháng/Năm, 6 Giờ Hoàng Đạo mỗi ngày và logic tính bù ngày ăn chay (Lục trai, Thập trai, Thiên ngươn) khi gặp tháng thiếu trong [`packages/shared/src/calendar/`](packages/shared/src/calendar).
  - Viết bộ Unit Test Jest toàn diện tại [`apps/api/src/calendar/calendar-math.spec.ts`](apps/api/src/calendar/calendar-math.spec.ts) đạt 100% pass (18/18 tests passed).

- [x] **Task 1.2 (Hoàn thành):**
  - Mở rộng `schema.prisma` thêm 3 bảng Lịch Đạo: `ReligiousEvent`, `CalendarRule`, `EventOccurrence`.
  - Thực thi migration `20261113042620_add_calendar_events_schema` vào cơ sở dữ liệu PostgreSQL.
  - Cập nhật `apps/api/prisma/seed.ts` nạp chính xác danh sách **13 Ngày Đại Lễ & Kỷ Niệm chính thức** của Hội Thánh Cao Đài Ban Chỉnh Đạo do người dùng trực tiếp thẩm định.
  - Đã chạy `prisma db seed` thành công vào DB và kiểm tra xác nhận qua Docker `psql`.

- [x] **Task 1.3 (Hoàn thành):**
  - Triển khai `CalendarModule`, `CalendarService`, `CalendarController`, `GetMonthCalendarDto`, `GetDayCalendarDto` trong `apps/api/src/calendar/`.
  - Cung cấp các API: `GET /api/calendar/month`, `GET /api/calendar/day`, `GET /api/calendar/events`.
  - Viết bộ Unit Test cho Service và Controller; toàn bộ 27/27 tests trong `apps/api` pass 100%.

- [x] **Task 1.4 & Nâng cấp UX / UI / Dữ liệu Lịch (Hoàn thành):**
  - **Nâng cấp Bảng Lịch Lớn (Big Calendar Grid):**
    - Tăng kích thước ô ngày từ 104px lên 155px–165px, hiển thị thoáng đãng và dễ đọc.
    - Hiển thị trực diện nhãn **`[🌑 Sóc • Mùng 1]`** (nền tối chữ trắng) và **`[🌕 Vọng • Rằm 15]`** (nền vàng kim) ngay trong từng ô lịch thay vì chỉ là dấu chấm nhỏ.
    - **Tối ưu Bảng Lịch Tròn Trong 1 Khung Hình & Responsive Toàn Diện (Full Viewport Fit):**
      - Bảng lịch tràn toàn bộ bề ngang (lên tới `1720px`), chiều cao được tối ưu hóa gọn gàng để trọn vẹn trong một khung màn hình máy tính mà không cần cuộn dọc dài.
      - Trên mobile: Các ô lịch hiển thị thông minh, ngày Dương to rõ, ngày Âm tinh tế, chỉ báo Sóc/Vọng/Chay/Lễ thu gọn bằng huy hiệu và chấm màu trực quan, chống vỡ giao diện.
    - **Tích Hợp Modal Pop-Up Chi Tiết Ngày ([`DayDetailModal.tsx`](apps/web/src/components/calendar/DayDetailModal.tsx)):**
      - Khi người dùng nhấn vào bất kỳ ngày nào trên bảng lịch (desktop lẫn mobile), một cửa sổ Pop-up trang nhã xuất hiện ngay trên màn hình.
      - Pop-up hiển thị đầy đủ: Ngày Dương lịch, Ngày Âm lịch (tháng đủ/thiếu/nhuận), Can Chi 3 cấp (Ngày/Tháng/Năm), Trai kỳ ăn chay, Danh sách chi tiết các ngày lễ tôn giáo/quốc gia, và **Lưới 12 Khung Giờ (Hoàng Đạo & Hắc Đạo)** với bộ lọc chuyển đổi.
    - **Thêm Thanh Điều Hướng Responsive Mobile ([`Navbar.tsx`](apps/web/src/components/Navbar.tsx)):**
      - Bổ sung nút Hamburger toggle và menu trượt mượt mà (Mobile Drawer) trên điện thoại di động, giúp truy cập nhanh chóng toàn bộ 6 phân hệ.
    - Hiển thị nhãn ngày lễ trọn vẹn, không bị cắt cụt; phân biệt rõ nét:
      - ✨ Lễ Đạo Cao Đài (`caodai-red` / `heritage-gold`).
      - 🇻🇳 Lễ Lớn & Kỷ Niệm Nhà Nước Việt Nam (nền đỏ tươi cờ hoa).
  - **Hiển thị đủ 12 Khung Giờ Trong Ngày (Hoàng Đạo & Hắc Đạo):**
    - Cập nhật thuật toán Thập Nhị Thần Sát (Ngọc Hạp Thông Thư) trong `@caodai-bcd/shared`: Tự động tính chính xác 12 sao chi phối (Thanh Long, Minh Đường, Thiên Hình, Chu Tước, Kim Quỹ, Thiên Đức, Bạch Hổ, Ngọc Đường, Thiên Lao, Huyền Vũ, Tư Mệnh, Câu Trận).
    - Thẻ [`DayDetailCard.tsx`](apps/web/src/components/calendar/DayDetailCard.tsx) hiển thị đầy đủ 12 giờ với bộ lọc chuyển đổi linh hoạt: _Tất cả 12 Giờ_, _6 Giờ Hoàng Đạo (Cát)_, _6 Giờ Hắc Đạo (Hung)_.
  - **Mở rộng Dữ liệu Seed 16 Ngày Lễ Lớn Nhà Nước Việt Nam:**
    - Cập nhật enum `NATIONAL_HOLIDAY` trong `schema.prisma`.
    - Seed đầy đủ 16 ngày lễ lớn: Tết Dương Lịch, Tết Nguyên Đán, Giỗ Tổ Hùng Vương, 30/4, 1/5, Quốc khánh 2/9, 8/3, 20/10, 20/11, 22/12, Tết Đoan Ngọ, Tết Táo Quân, v.v.
    - Nâng cấp bảng tham chiếu [`ReligiousEventsReference.tsx`](apps/web/src/components/calendar/ReligiousEventsReference.tsx) thành 2 tabs tra cứu song hành (Đại Lễ Ban Chỉnh Đạo & Lễ Quốc Gia).
    - Bổ sung bộ lọc sự kiện trực tiếp trên thanh công cụ Lịch: _Tất cả_, _Lễ Đạo Cao Đài_, _Lễ Nhà Nước VN_.
  - **Khắc phục triệt để lỗi Webpack cache chunk `./135.js`:** Cấu hình `"dev": "npm run clean && next dev -p 3000"` trong `apps/web/package.json` tự động dọn cache trước khi boot.

- [x] **Task 1.5 (Hoàn thành) — Tính Năng Dark Mode Toàn Diện Cho Website:**
  - **Cấu hình Tailwind Dark Mode:** Kích hoạt `darkMode: 'class'` tại [`apps/web/tailwind.config.ts`](apps/web/tailwind.config.ts).
  - **Hệ thống CSS Variables Đa Tầng:** Ánh xạ toàn bộ bảng màu di sản `heritage` sang CSS variables với kênh màu RGB và alpha opacity tại [`apps/web/src/app/globals.css`](apps/web/src/app/globals.css).
  - **Phong cách Dark Mode Di Sản Cao Đài (Tam Trấn Dạ Đăng):**
    - Nền chính: Gỗ mun trầm ấm (`#12100E`).
    - Khối thẻ/panel: Gỗ gụ thâm trầm (`#1D1916`) cùng viền đồng thau cổ (`#382F28`).
    - Ánh sáng điểm xuyết: Vàng hoàng kim dạ đăng rực rỡ (`#F59E0B` / `#FBBF24`).
    - Chữ đọc: Màu ngà voi cổ êm dịu mắt (`#F4EFE6`), chữ phụ xám tro nhạt (`#B8ACA0`).
  - **Quản Lý Trạng Thái Giao Diện ([`ThemeProvider.tsx`](apps/web/src/components/ThemeProvider.tsx)):**
    - Hỗ trợ 3 chế độ: Sáng (`light`), Tối (`dark`), Tự động theo hệ điều hành (`system`).
    - Lưu trạng thái vào `localStorage` (`caodai-theme`), tự động lắng nghe sự kiện thay đổi của hệ thống (`matchMedia`).
    - Script inline chạy tức thì trước khi render DOM chống chớp nháy màn hình (Zero FOUC).
  - **Nút Bấm Chuyển Đổi Giao Diện ([`ThemeToggle.tsx`](apps/web/src/components/ThemeToggle.tsx)):**
    - Tích hợp nút chuyển đổi Mặt Trời ☀️ / Mặt Trăng 🌙 với hiệu ứng xoay góc mượt mà trên Navbar (cả Desktop và Mobile Drawer).
    - Tích hợp bộ điều khiển Segmented Control 3 tùy chọn (`Sáng` / `Tối` / `Hệ thống`) tại chân trang (Footer).
  - **Hoàn Thiện Giao Diện Các Trang:**
    - Cập nhật trang chủ (`/`), thanh Navbar, Footer, bảng Lịch Đạo (`/calendar`), danh mục 29 ngày lễ, và Modal Pop-up 12 Khung Giờ tương thích hoàn hảo cả 2 chế độ sáng và tối.
  - Đã kiểm thử `npm run build --workspace=apps/web` thành công 100% không cảnh báo.

- [x] **Task 1.7 (Hoàn thành) — Tái Cấu Trúc Toàn Diện UI/UX & Khắc Phục Undersized Text:**
  - Khắc phục triệt để lỗi "UNDERSIZED FUNCTIONAL TEXT" (theo ảnh Audit UI của người dùng): Nâng toàn bộ các nhãn chức năng lên tối thiểu `text-xs` (12px) và `text-sm` (14px).
  - Chuyển đổi lưới lịch thành Bảng Lưới Nguyên Khối (Architectural Grid) phẳng, loại bỏ cấu trúc card lồng card và loại bỏ các viền dạ quang neon AI-slop.

- [x] **Task 1.8 (Hoàn thành) — Thiết Kế Lại Toàn Diện Hệ Màu Di Sản Cao Đài & Khắc Phục Lỗi Font Số Âm Lịch:**
  - **Khắc phục triệt để phong cách trắng đen (loại bỏ cảm giác lạnh lẽo, đơn điệu không phù hợp chốn tôn giáo):**
    - Thay thế toàn bộ phong cách trắng đen thuần túy (`zinc-900`/`white`) bằng **Bảng Màu Di Sản Cao Đài Bản Sắc (Heritage Warm Ink & Sacred Tam Giáo)**:
      - **Nền Giấy Điệp / Giấy Dó Cổ (`--bg-canvas: #FDFBF7`, `--bg-surface: #F6F1E6`):** Sắc ngà ấm dịu mắt, gợi chiều sâu thư tịch kinh viện xưa, đọc lâu không mỏi.
      - **Chữ Mực Nho & Gỗ Mun Trầm (`--text-primary: #231812`):** Nâu đen mực tàu cổ kính, tương phản cực cao $\ge 14.5:1$.
      - **Bộ Ba Sắc Di Sản Tam Giáo Cổ Pháp:**
        - **Vàng Hoàng Thổ Trầm (`--caodai-ochre: #A66E16`):** Tôn vinh y bát và đạo phục Phái Thái (Phật đạo), màu sắc điểm xuyết ấm áp, không chói chang.
        - **Xanh Chàm Cổ (`--caodai-indigo: #1E3A66`):** Tôn vinh đạo phục Phái Thượng (Tiên đạo), dùng cho Thứ Bảy và các nhãn tri thức.
        - **Đỏ Son Chu Sa (`--caodai-vermilion: #9E2A2B`):** Tôn vinh sắc phục Phái Ngọc (Nho đạo) và ấn triện truyền thống, dùng cho Chủ Nhật, Đại Lễ Đạo và nút hành động chính.
        - **Xanh Rêu Thanh Trai (`--caodai-pine: #2D5A3D`):** Huy hiệu ngày ăn chay thanh nhã.
    - **Dark Mode (Chốn Tổ Đình Thiền Môn Về Đêm):** Sắc gỗ mun trầm ấm (`#161311`), bề mặt gỗ trắc (`#221C18`), viền đồng thau cổ (`#3D332A`) và chữ ngà voi sáng êm mắt (`#F5EFE6`).
  - **Khắc phục triệt để lỗi "font số âm lịch ở bảng lịch đang bị lỗi to hơn chữ":**
    - Nguyên nhân: Trước đây số ngày âm được đặt trong thẻ riêng với font size/weight khác (`text-xs font-semibold` hoặc `font-bold`), trong khi chữ `ÂL` bị ép thành `text-[11px]` hoặc `text-[10px]` với màu nhạt, dẫn đến số trông to, cao và lấn át hẳn chữ `ÂL`.
    - Giải pháp dứt điểm: Tích hợp cả số ngày âm và chữ `ÂL` trong **cùng 1 thẻ text duy nhất** (`<span className="font-sans text-xs font-semibold tabular-nums leading-none">`), sử dụng cùng font chữ `Plus Jakarta Sans` với cỡ chữ chuẩn mực 12px. Số và chữ giờ đây có cùng chiều cao x-height, tỷ lệ cân đối hoàn hảo và nhỏ hơn ~50% so với số ngày Dương lịch (`font-serif text-xl sm:text-2xl font-bold`).
  - **Đồng bộ hóa 100% các bề mặt ứng dụng:**
    - [`apps/web/src/app/globals.css`](apps/web/src/app/globals.css) & [`apps/web/tailwind.config.ts`](apps/web/tailwind.config.ts): Định nghĩa token chuẩn `caodai-*` và `heritage-*`.
    - [`apps/web/src/components/calendar/CalendarDayCell.tsx`](apps/web/src/components/calendar/CalendarDayCell.tsx): Căn chỉnh tỷ lệ ngày Dương, ngày Âm, huy hiệu Sóc/Vọng/Chay và thanh ngày lễ.
    - [`apps/web/src/app/calendar/page.tsx`](apps/web/src/app/calendar/page.tsx): Header Thứ Bảy (xanh chàm), Chủ Nhật (đỏ chu sa), T2-T6 (mực nho).
    - [`apps/web/src/components/Navbar.tsx`](apps/web/src/components/Navbar.tsx): Nền ngà ấm, viền chỉ sách xưa, logo Cổ Pháp Tam Giáo tinh tế.
    - [`apps/web/src/app/page.tsx`](apps/web/src/app/page.tsx): Khung Thiên Nhãn, thanh tìm kiếm đỏ chu sa, các card chuyên mục viền hoàng thổ trầm.
    - [`apps/web/src/components/calendar/ReligiousEventsReference.tsx`](apps/web/src/components/calendar/ReligiousEventsReference.tsx) & [`ThemeToggle.tsx`](apps/web/src/components/ThemeToggle.tsx).
  - Kiểm thử biên dịch `npm run build --workspace=apps/web` thành công 100% không lỗi.

- [x] **Task 1.9 (Hoàn thành) — Khôi Phục Dải 3 Màu Tam Giáo, Kiến Trúc Phẳng Không Bo Góc & Nâng Cấp Font Tiếng Việt:**
  - **Khôi phục dải 3 màu sắc chủ đạo Tam Giáo Cao Đài (Vàng - Xanh - Đỏ):**
    - Đặt dải `TamGiaoStripe` (`h-1.5 w-full`) tại vị trí **đầu Header** (ngay trên đỉnh thanh Navbar, neo cố định sticky khi cuộn trang) và **đầu Footer** theo đúng biểu tượng thiêng liêng Cờ Đạo (Vàng: Thái Thanh / Xanh: Thượng Thanh / Đỏ: Ngọc Thanh).
  - **Tái cấu trúc Trang Chủ ([`apps/web/src/app/page.tsx`](apps/web/src/app/page.tsx)) — Loại bỏ bo tròn & Card lồng card:**
    - Loại bỏ hoàn toàn các góc bo tròn (`rounded-none`, 0px radius), chuyển sang phong cách kiến trúc phẳng, kẻ chỉ sách xưa đĩnh đạc và uy nghiêm.
    - Tạo khoảng cách thoáng đãng và dễ thở giữa các ô chuyên mục (`gap-5 sm:gap-6`), mỗi ô có viền 1px độc lập thanh nhã (`border border-heritage-border`) với hiệu ứng hover vàng hoàng thổ trầm (`hover:border-caodai-ochre`).
    - Loại bỏ triệt để cấu trúc card lồng card: Bức họa Thiên Nhãn hiển thị trực tiếp và trang trọng ở cột phải Hero mà không bọc thêm hộp card phụ bên ngoài; thanh tìm kiếm phẳng liền khối; các icon và nhãn thể loại trong từng ô chuyên mục hiển thị trực diện, không đóng khung hộp rườm rà.
  - **Nâng cấp Hệ Thống Font Chữ Tiếng Việt ([`apps/web/src/app/layout.tsx`](apps/web/src/app/layout.tsx) & [`globals.css`](apps/web/src/app/globals.css)):**
    - Thay thế font tiêu đề sang **`Lora`**: Khắc phục triệt để hiện tượng nét thanh mảnh vụn vỡ và dấu tiếng Việt bị ép chặt của Playfair Display; các dấu hỏi, ngã, nặng, sắc, huyền hiển thị tròn trịa, thanh thoát, dễ đọc.
    - Thay thế font nội dung sang **`Be Vietnam Pro`**: Font được thiết kế chuyên biệt cho hệ chữ tiếng Việt, khoảng cách dấu tối ưu, độ thoáng dòng thoải mái (`line-height: 1.6`).
    - Xóa bỏ `letter-spacing: -0.015em`, giúp các chữ cái và dấu thanh không bị dính vào nhau.
  - Đã kiểm thử `npm run build --workspace=apps/web` thành công 100% (tải trang nhẹ ~101 kB).
- **Điều chỉnh Thiết Kế Hệ Thống Phase 2 — Tổ Đình Bến Tre & Thánh Sở Thu Gọn (2026-11-13):**
  - **Lý do nghiệp vụ & bảo mật:** Thu gọn danh mục các Thánh Thất địa phương thành một phân mục nhỏ có kiểm soát bảo mật; chuyển trọng tâm chính sang giới thiệu chuyên sâu Cụm Tổ Đình Bến Tre gồm 4 công trình: **Tòa Thánh Bến Tre (An Hội)**, **Điện Thờ Phật Mẫu**, **Nhà Tu Trung Thừa**, **Nhà Tu Thượng Thừa** theo 3 trụ cột **Lịch sử – Xây dựng – Đường đi đến**.
  - **Cập nhật toàn bộ tài liệu đặc tả & kế hoạch:** [`docs/01-business/BRD.md`](docs/01-business/BRD.md), [`docs/01-business/BUSINESS_RULES.md`](docs/01-business/BUSINESS_RULES.md) (`BR-SITE-01..04`), [`docs/02-architecture/SYSTEM_ARCHITECTURE.md`](docs/02-architecture/SYSTEM_ARCHITECTURE.md), [`docs/03-database/DATABASE_SCHEMA.md`](docs/03-database/DATABASE_SCHEMA.md), [`docs/06-planning/DEVELOPMENT_ROADMAP.md`](docs/06-planning/DEVELOPMENT_ROADMAP.md), [`README.md`](README.md), và tạo mới [`docs/06-planning/PHASE_2_TOA_THANH_PLAN.md`](docs/06-planning/PHASE_2_TOA_THANH_PLAN.md).
  - **Cập nhật Database (`apps/api/prisma/schema.prisma`):** Bổ sung `SiteType`, `VisibilityLevel` (`PUBLIC_FEATURED`, `PUBLIC_COMPACT`, `INTERNAL_ONLY`), `SiteSectionType` (`HISTORY`, `ARCHITECTURE`, `DIRECTIONS`), `VerificationStatus`, `OrganizationUnit`, `WorshipSite`, `SiteDetailSection`. Đã kiểm thử `npx prisma validate`.
  - **Cập nhật UX/UI (`apps/web`):** Cập nhật [`Navbar.tsx`](apps/web/src/components/Navbar.tsx) và [`page.tsx`](apps/web/src/app/page.tsx) sang điều hướng `/to-dinh` (**Tòa Thánh Bến Tre**), bổ sung khung hình ảnh, giới thiệu các cơ quan Nội viện, Lễ viện, Dưỡng đường và tinh gọn đoạn mô tả box Tòa Thánh Bến Tre trên trang chủ vừa vặn 3 dòng.
- **Triển khai Phase 2 — Tổ Đình Bến Tre & Thánh Sở Thu Gọn (2026-11-13):**
  - **Seed Data (`apps/api/prisma/seed-sites.ts` & `seed.ts`):** Tạo seed cho 7 công trình trọng tâm tại Tòa Thánh Bến Tre (Tòa Thánh Bến Tre / Thánh thất An Hội cũ, Diêu Trì Bửu Điện, Vườn Kỳ Thọ, Nhà tu Trung thừa Nam, Nhà tu Trung thừa Nữ, Nhà tu Thượng thừa Nam, Nhà tu Thượng thừa Nữ) với 3 trụ cột `HISTORY`, `ARCHITECTURE`, `DIRECTIONS` và danh mục thu gọn `PUBLIC_COMPACT`.
  - **Backend API (`apps/api/src/sites/`):** Xây dựng `SitesModule`, `SitesController`, `SitesService` và unit tests (`sites.service.spec.ts`) cung cấp 3 endpoints: `GET /api/sites/featured`, `GET /api/sites/featured/:slug`, `GET /api/sites/compact`.
  - **Dữ liệu Tòa Thánh Bến Tre:** Đã nghiên cứu và nạp dữ liệu lịch sử, kiến trúc, đường đi chính xác (Hồ sơ Di tích cấp tỉnh 2017: Số 100C đường Trương Định, P.6, TP. Bến Tre; các mốc 1928 Thánh thất An Hội, 1934 Ban Chỉnh Đạo, 1935 Giáo Tông Nguyễn Ngọc Tương, 1947 khởi công Đền Thánh kiên cố; cấu trúc Tam Đài: Hiệp Thiên Đài lầu chuông lầu trống nóc chữ Vạn, Cửu Trùng Đài thềm tiến chín bậc bao lam sơn son thếp vàng, Bát Quái Đài phụng thờ Thiên Nhãn và Quả Càn Khôn).
  - **Frontend (`apps/web/src/app/to-dinh/`):** Xây dựng trang `/to-dinh` và component [`ToDinhExplorer.tsx`](apps/web/src/components/sites/ToDinhExplorer.tsx) hiển thị trọn vẹn 7 công trình trọng tâm, gỡ bỏ phần cơ quan xung quanh theo yêu cầu, tích hợp khung hình ảnh tư liệu, 3 tab Lịch sử - Xây dựng - Đường đi đến, và mục Thánh Thất thu gọn ở cuối trang.
  - **Tích hợp Ảnh Thực Tế (2026-11-14):**
    - Tiếp nhận và lưu trữ 4 ảnh thực tế độ nét cao do người dùng cung cấp vào [`apps/web/public/images/`](apps/web/public/images/):
      - `toa-thanh-ben-tre.jpg`: Ảnh chụp mặt tiền Tòa Thánh Bến Tre với hai tháp Kim Chung - Ngọc Cổ và bảo tháp sân tiền đình.
      - `dieu-tri-buu-dien.jpg`: Ảnh toàn cảnh Diêu Trì Bửu Điện (Điện Thờ Phật Mẫu) uy nghi dưới vòm trời xanh.
      - `dieu-tri-buu-dien-2.jpg`: Ảnh hành lang hàng cột hiên và cờ Đạo.
      - `dieu-tri-buu-dien-3.jpg`: Ảnh cận cảnh các tầng tháp nhiều lớp và hoa văn chạm trổ mái đao.
    - Nâng cấp [`ToDinhExplorer.tsx`](apps/web/src/components/sites/ToDinhExplorer.tsx) với tính năng Gallery: hỗ trợ xem ảnh chính kèm hàng thumbnail các góc ảnh thực tế khác nhau, hiển thị chú thích chi tiết tương ứng, tự động reset index khi chuyển công trình.
    - Cả 2 workspace `apps/api` (30/30 tests passed) và `apps/web` (build thành công 100%) đều sạch và sẵn sàng.
  - **Chạy Migration & Nạp Database PostgreSQL (2026-11-14):**
    - Thực thi migration `20261113174027_add_worship_sites_phase2` tạo thành công các bảng `worship_sites`, `site_detail_sections`, `organization_units` và các enum liên quan vào database PostgreSQL (`caodai_digital_library`).
    - Bổ sung trường `imageUrl` và `imageCaption` vào model `WorshipSite`.
    - Chạy thành công toàn bộ `npx ts-node apps/api/prisma/seed.ts`, nạp trọn vẹn 7 công trình trọng tâm, các mục Lịch sử - Kiến trúc - Đường đi và 4 cơ sở Thánh Thất thu gọn vào CSDL thực tế.
  * **Đồng Bộ Quy Trình Kỹ Thuật 10 Giai Đoạn & 5 Nguyên Tắc Bắt Buộc (2026-11-19):**
    - Cập nhật trọn vẹn [`AGENTS.md`](AGENTS.md) (Mục 0) với: Vai trò Senior Software Engineer/Architect (giao tiếp tiếng Việt dễ hiểu cho người dùng phi kỹ thuật); Quy trình 10 giai đoạn SDLC; 5 Nguyên tắc bắt buộc (Không làm vượt bước, Không tự ý quyết định thay người dùng, Không sửa code mù quáng, Không tuyên bố hoàn thành khi chưa kiểm chứng, Không lạm dụng công nghệ); Mẫu báo cáo 7 mục chuẩn; Phương châm "Hiểu đúng → Thiết kế đúng → Làm từng phần → Kiểm tra → Triển khai → Bảo trì".
    - Khởi tạo chính thức Hiến pháp dự án tại [`.specify/memory/constitution.md`](.specify/memory/constitution.md) tích hợp các tiêu chuẩn kỹ thuật và tôn chỉ bản scan gốc đối chiếu.
    - Cập nhật [`SKILLS_NOTE.md`](SKILLS_NOTE.md) ánh xạ chi tiết các kỹ năng hiện có vào từng bước trong 10 giai đoạn SDLC.
    - Chuẩn hóa toàn diện bản kế hoạch chi tiết [`PHASE_3_LIBRARY_PLAN.md`](docs/06-planning/PHASE_3_LIBRARY_PLAN.md) (v2.0.0) theo đúng cấu trúc 10 giai đoạn SDLC (PRD, Kiến trúc 6 thành phần, Database Schema 6 bảng, UI/UX Split Reader, 4 Vertical Slices, Checklist Bảo mật & Kiểm thử toàn diện).

---

## 3. Tiến độ Phase 3: Thư Viện Đạo & Bộ Đọc Đối Chiếu (Đang thực hiện)

- [x] **Slice 3.1: Thiết kế Schema Tổng Quát & Seed Dữ Liệu Thực Tế Từ PDF (2026-11-19):**
  - **File PDF đối chiếu:** Sao chép [`Kinh Cung Tu Thoi Va Quan Hon Tang Te.pdf`](Kinh%20Cung%20Tu%20Thoi%20Va%20Quan%20Hon%20Tang%20Te.pdf) (144 trang, Ấn bản NXB Tôn Giáo 2022, ISBN `978-604-61-8816-2`) vào `apps/web/public/scans/kinh-cung-tu-thoi-quan-hon-tang-te-2022.pdf` kèm mã băm SHA-256 `5DFEB3D3617291BAABDCE7E5781A8FE50FF937598903812DFDC7DEDF9ED452E8`.
  - **Schema Tổng Quát (`apps/api/prisma/schema.prisma`):** Mở rộng 6 bảng tổng quát (`DocumentCategory`, `Document`, `DocumentEdition`, `DocumentFile`, `DocumentSection`, `DocumentContent`) hỗ trợ mọi bộ kinh tương lai của Hội Thánh Ban Chỉnh Đạo: gắn thẻ phân loại đa chiều (`ritualTags`, `purposeTags`, `timingTags`, `tuneType`), audio theo từng bài kinh (`sectionId` trên `DocumentFile`), lịch sử & nguồn gốc (`historicalOrigin`, `isbn`, `registrationCode`, `editorialTeam`), ánh xạ số trang sách in (`printedPageLabel`) và số trang PDF (`pdfPageStart`/`pdfPageEnd`). Đã `prisma validate` & `prisma generate`.
  - **Seed Data (`apps/api/prisma/seed-library.ts`):** Nạp 8 danh mục chuẩn (đã gộp phân loại Quan - Hôn - Tang - Tế vào danh mục Kinh Cúng Tứ Thời theo đúng cấu trúc ấn bản *Kinh Cúng Tứ Thời và Quan - Hôn - Tang - Tế*) và dữ liệu nguyên văn đối chiếu trực tiếp từ bản scan PDF (Phần I Kinh Cúng Tứ Thời, Trai kỳ, Cách thờ phượng, Cách lạy, Phần II Quan-Hôn-Tang-Tế), giữ nguyên 100% dấu câu và chú thích dị bản.
  - **Migration & Nạp DB PostgreSQL:** Đã khởi động Docker (`caodai_bcd_db` Healthy), chạy thành công migration `20261119161502_add_library_phase3` và thực thi `npx ts-node apps/api/prisma/seed.ts` nạp đầy đủ dữ liệu vào CSDL thực tế.
- [x] **Slice 3.2: Xây dựng Backend Library API & Unit Tests (2026-11-19):**
  - Tạo [`SearchDocumentsDto`](apps/api/src/library/dto/search-documents.dto.ts), [`LibraryService`](apps/api/src/library/library.service.ts), [`LibraryController`](apps/api/src/library/library.controller.ts), [`LibraryModule`](apps/api/src/library/library.module.ts), đăng ký vào `AppModule`.
  - Cung cấp 5 API công khai (chỉ trả về bản `PUBLISHED`): `GET /api/library/categories`, `GET /api/library/documents` (lọc theo danh mục, nghi thức, mục đích, thời điểm, tìm kiếm toàn văn), `GET /api/library/documents/:slug`, `GET /api/library/editions/:id`, `GET /api/library/sections/:id`.
  - Viết Unit Tests tại [`library.service.spec.ts`](apps/api/src/library/library.service.spec.ts): 6/6 test suites (38/38 tests) pass 100%; `nest build` thành công.
- [x] **Slice 3.3 & 3.4: Trang Danh Mục Thư Viện (`/library`) & Bộ Đọc Đối Chiếu Song Song (`/library/[slug]`) (2026-11-19):**
  - Tạo [`library-data.ts`](apps/web/src/lib/library-data.ts) chứa types và dữ liệu fallback chuẩn xác trích xuất từ PDF gốc (8 danh mục chuẩn + 109 mục lục & bài kinh đầy đủ).
  - Xây dựng [`LibraryExplorer.tsx`](apps/web/src/components/library/LibraryExplorer.tsx) và [`/library`](apps/web/src/app/library/page.tsx): Tìm kiếm toàn văn, lọc 8 danh mục, lọc theo thẻ nghi thức/mục đích, thiết kế Warm Heritage 0px radius.
  - Xây dựng [`SplitLibraryReader.tsx`](apps/web/src/components/library/SplitLibraryReader.tsx) và [`/library/[slug]`](apps/web/src/app/library/[slug]/page.tsx):
    + Cột Mục lục tương tác **đầy đủ 3 cấp (109 mục lục & bài kinh)** theo đúng cấu trúc Phần I (Kinh Cúng Tứ Thời + Nội dung phụ) và Phần II (Quan Hôn Tang Tế từ A. Lời Tựa đến J. Kinh Kỵ Lạp, bao gồm trọn vẹn 6 bài Kinh Sanh và 13 bài Kinh Làm Tuần từ Khai Cửu đến Đệ Cửu Cửu, Tiểu/Đại Tường).
    + Bài 18 đã tách thành hai mục độc lập: `18. Kinh Sám Hối` (hiển thị trọn vẹn đầy đủ toàn bộ 111 câu/khổ kinh) và `Bài Khen Ngợi Kinh Sám Hối`.
    + **Bổ sung nghi thức nguyện vái lạy:** Đã tích hợp đầy đủ và trang trọng số lạy, số gật và câu chú niệm tương ứng ở cuối 19 bài kinh cúng Tứ Thời cùng Nghi cúng lễ Vía Phật Mẫu theo đúng chuẩn nghi lễ Ban Chỉnh Đạo. Đặc biệt câu niệm của **Kinh Chuyển Luật Bạch Ngọc** đã được chuẩn hóa chính xác: *Lạy 3 lạy, mỗi lạy gật 3 gật (9 gật), mỗi gật niệm: "Nam Mô Cái Thiên Tiên Quan Từ Bi Phổ Tế Thiên Tôn"*.
    + **Sửa lỗi chọn bài kinh & bổ sung trọn vẹn kinh văn:** Sửa lỗi kích hoạt giao diện khi chọn bài kinh từ C. Hôn Nhơn đến H. Kinh Tống Chung trong [`SplitLibraryReader.tsx`](apps/web/src/components/library/SplitLibraryReader.tsx); trích xuất nguyên văn đối chiếu từ bản scan gốc PDF (trang 60 đến 102) cho toàn bộ 32 bài kinh (C. Hôn Nhơn 6 bài, D. Kinh Lão 8 bài, E. Kinh Bịnh 3 bài, F. Kinh Tử 9 bài, G. Kinh Điếu 7 bài, H. Kinh Tống Chung 13 bài) vào cả `library-data.ts` và CSDL PostgreSQL qua `seed-library.ts`.
    + **Bổ sung 2 mục mới & các bài kinh tương ứng:**
      - Thêm mục **K. KINH CÚNG CÔ HỒN** gồm 2 bài: *1. Cầu Vong* và *2. Kinh Cúng Thập Loại Cô Hồn*.
      - Thêm mục **J. KINH TẾ CHIẾN SĨ** gồm 3 bài: *1. Thỉnh Vong Cúng Chiến Sĩ*, *2. Cúng Vong Chiến Sĩ* và *3. Kinh Tế Chiến Sĩ* (đầy đủ số trang in 119–122 và liên kết PDF scan trang 121–124).
      - Đồng thời bổ sung toàn bộ văn bản của 9 bài thuộc **J. KINH KỴ LẠP** (*Kỵ Cơm, Giỗ Hội Báo ân từ, Giỗ Hội thông dụng, Hiến Hoa, Hiến Quả, Hiến Tửu Trà*).
    + **Bổ sung đầy đủ toàn bộ phần kinh từ trang 119 đến hết sách (trang 127 / PDF trang 121–129) theo yêu cầu đối chiếu scan gốc:**
      - **J. KINH TẾ CHIẾN SĨ** (trang 119–122 / PDF 121–124):
        * *1. Thỉnh Vong Cúng Chiến Sĩ* (trang 119 / PDF 121)
        * *2. Cúng Vong Chiến Sĩ* (trang 120 / PDF 122)
        * *3. Kinh Tế Chiến Sĩ* (trang 121–122 / PDF 123–124)
      - **A. VỌNG THÀI XUÂN CÚNG THẦY** (trang 123–124 / PDF 125–126):
        * *1. Hiến Từng Hoa* (trang 123 / PDF 125)
        * *2. Hiến Từng Tửu* (trang 123 / PDF 125)
        * *3. Hiến Từng Trà* (trang 124 / PDF 126)
      - **B. VỌNG THÀI NAM CÚNG VONG (Thông Dụng)** (trang 124–125 / PDF 126–127):
        * *1. Từng Sơ* (trang 124 / PDF 126)
        * *2. Từng Á* (trang 125 / PDF 127)
        * *3. Từng Chung* (trang 125 / PDF 127)
      - **C. VỌNG THÀI NAM CÚNG VONG CHIẾN SĨ** (trang 125–126 / PDF 127–128):
        * *1. Từng Sơ* (trang 125 / PDF 127)
        * *2. Từng Á* (trang 126 / PDF 128)
        * *3. Từng Chung* (trang 126 / PDF 128)
      - **K. LỜI NGUYỆN** (trang 126–127 / PDF 128–129) kèm câu niệm *NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT*.
      - **L. KINH CẦU AN** (trang 127 / PDF 129) kèm câu niệm *NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT*.
    + Nhấp chọn bất kỳ bài kinh nào đều tự động hiển thị trọn vẹn bản văn số hóa đồng thời nhảy đến đúng số trang tương ứng trên bản PDF scan gốc.
    + Bản văn số hóa với thanh điều chỉnh 4 cỡ chữ, chú thích dị bản và trích dẫn nguồn (copy 1 click).
    + Khung đối chiếu trực tiếp PDF bản scan gốc (`#page=...`), chuyển đổi mượt mà sang 2 tab trên Mobile.
  - Đã nạp thành công trọn vẹn **130 mục lục & bài kinh** vào PostgreSQL (`caodai_bcd_db`), Unit test backend 38/38 tests pass, kiểm thử `npm run build --workspace=apps/web` thành công 100% (tất cả 8 routes đều sạch).
  - **Tách riêng 2 phân khu Kinh Sách & Tài Liệu Lễ Nhạc Đường (2026-11-27):**
    + **Database (`apps/api/prisma/schema.prisma` & `seed-library.ts`):** Bổ sung enum `LibraryDomain` (`KINH_SACH`, `LE_NHAC_DUONG`) và trường `domain` trên bảng `document_categories` (migration `20261127052852_add_library_domain_separation`). Tách danh mục `tai-lieu-le-nhac-duong` (`LE_NHAC_DUONG`) khỏi 7 danh mục `KINH_SACH`.
    + **Backend (`apps/api/src/library/`):** Cập nhật `GET /api/library/categories` và `GET /api/library/documents` hỗ trợ lọc theo `domain`.
    + **Frontend (`apps/web/`):**
      - Tách card `Kinh Sách & Giáo Lý` trên trang chủ [`page.tsx`](apps/web/src/app/page.tsx) thành 2 mục độc lập: **Kinh Sách** (`/library`) và **Tài Liệu Lễ Nhạc Đường** (`/le-nhac-duong`).
      - Cập nhật [`Navbar.tsx`](apps/web/src/components/Navbar.tsx) bổ sung điều hướng **Lễ Nhạc Đường** (`/le-nhac-duong`).
      - Tạo trang chuyên biệt [`apps/web/src/app/le-nhac-duong/page.tsx`](apps/web/src/app/le-nhac-duong/page.tsx) và cập nhật [`LibraryExplorer.tsx`](apps/web/src/components/library/LibraryExplorer.tsx) lọc theo `domain` để phần Kinh Sách hoàn toàn riêng biệt.
    + **Tài liệu hệ thống:** Cập nhật [`BRD.md`](docs/01-business/BRD.md) và [`PHASE_3_LIBRARY_PLAN.md`](docs/06-planning/PHASE_3_LIBRARY_PLAN.md).
  - **Nâng cấp Bộ Đọc Kinh Văn — Toàn màn hình & Tối ưu Mobile (2026-11-27):**
    + **Xem toàn màn hình (Focus Mode):** Bổ sung nút "Xem toàn màn hình" trong [`SplitLibraryReader.tsx`](apps/web/src/components/library/SplitLibraryReader.tsx). Chế độ này lọc thuần nội dung bài kinh (tự động tách bỏ nghi thức vái lạy và ghi chú bên dưới để tập trung tụng/đọc).
    + **Thanh điều hướng toàn màn hình:** Hiển thị rõ nút "Bài kế tiếp" kèm tên cụ thể của bài kinh kế tiếp (tự động bỏ qua các mục tiêu đề rỗng), nút "Bài trước", và công cụ tăng/giảm cỡ chữ.
    + **Mục lục trên Mobile:** Thêm nút toggle "Thu gọn / Mở rộng" ngay tại tiêu đề Mục Lục Ấn Bản trên giao diện điện thoại, giúp tiết kiệm không gian màn hình.
  - **Biểu tượng Chuông chữ U & Chày gõ thỉnh chuông (2026-11-27):**
    + Tạo component SVG [`BellMalletIcon.tsx`](apps/web/src/components/library/BellMalletIcon.tsx) mô phỏng chuông gia trì hình chữ U và chày gõ.
    + Bổ sung chức năng bật/tắt hiển thị chuông (`Hiện chuông` / `Ẩn chuông`), chế độ `Tùy chỉnh đánh chuông` (lưu `localStorage`, nút `Sao chép dữ liệu chuông`) trong [`SplitLibraryReader.tsx`](apps/web/src/components/library/SplitLibraryReader.tsx).
    + Nạp chính thức dữ liệu đánh dấu chuông đã được người dùng kiểm tra cho **18 bài kinh** (từ bài 1 đến bài 12 và bài 15, 16, 17, 18, Bài Khen Ngợi Kinh Sám Hối, 19).
    + Hỗ trợ gắn chuông chi tiết tới từng danh xưng/cụm từ bên trong bài *19. Kinh Cứu Khổ*.
  - **Tích hợp UI Elements phong cách Uiverse (2026-11-27):**
    + Switch chế độ Sáng/Tối phong cách Sun/Moon (`honest-stingray-90`) tại [`ThemeToggle.tsx`](apps/web/src/components/ThemeToggle.tsx).
    + Nút bấm Khám phá phong cách Arrow Button (`new-bird-34`) tại [`page.tsx`](apps/web/src/app/page.tsx).
    + Hiệu ứng viền chuyển động thẻ chuyên mục (`fresh-wombat-97`) tại [`globals.css`](apps/web/src/app/globals.css): Giữ nguyên cơ chế 2 vệt sáng song song quét đối xứng quanh viền như bản gốc; mỗi vệt sáng là cụm 3 màu Tam Giáo (Vàng `#eab308`, Xanh `#2563eb`, Đỏ `#dc2626`) chuyển sắc mượt mà, không phủ kín toàn bộ viền.
    + Khung tìm kiếm phong cách Search Input bo tròn (`funny-cougar-97`) kèm icon kính lúp tại [`page.tsx`](apps/web/src/app/page.tsx), đã được phối màu đồng bộ hoàn toàn với palette giấy ngà (`--bg-surface`, `--border-subtle`, focus viền vàng hoàng thổ `--caodai-ochre`), đồng thời đã bỏ dòng gợi ý bên dưới giúp giao diện tinh giản, sạch sẽ.
    + Nút bấm Tra cứu hiệu ứng tia sáng quét ngang (`stale-cheetah-42`) tại [`page.tsx`](apps/web/src/app/page.tsx), đã đồng bộ màu đỏ son chu sa (`--caodai-vermilion`), hiệu ứng phát quang ấm áp tôn nghiêm.
    + Effect Loading phong cách Dot Pulse (`bad-firefox-25`) chuyển thể theo **3 màu chủ đạo Tam Giáo Cao Đài** (Vàng Thái Thanh - Xanh Thượng Thanh - Đỏ Ngọc Thanh) tại [`apps/web/src/components/TamGiaoLoader.tsx`](apps/web/src/components/TamGiaoLoader.tsx).
    + **Hệ thống Loading Chuyển Trang Toàn Diện (Toàn Bộ Ứng Dụng):**
      - Tích hợp component điều hướng toàn cầu [`NavigationLoader.tsx`](apps/web/src/components/NavigationLoader.tsx) vào [`layout.tsx`](apps/web/src/app/layout.tsx): Tự động phát hiện khi người dùng nhấp vào bất kỳ liên kết chuyển trang nào (Navbar, Menu, Footer, Thẻ chuyên mục, nút Đọc sách...) để hiển thị thanh tia sáng Tam Giáo ở đỉnh đầu cùng modal 3 chấm Tam Giáo pulsing mượt mà.
      - Bổ sung các tệp `loading.tsx` chuẩn Next.js App Router cho tất cả các phân hệ: [`apps/web/src/app/loading.tsx`](apps/web/src/app/loading.tsx) (Gốc), [`apps/web/src/app/library/loading.tsx`](apps/web/src/app/library/loading.tsx) (Kinh Sách), [`apps/web/src/app/library/[slug]/loading.tsx`](apps/web/src/app/library/[slug]/loading.tsx) (Bộ đọc kinh văn & bản scan), [`apps/web/src/app/calendar/loading.tsx`](apps/web/src/app/calendar/loading.tsx) (Lịch Đạo), [`apps/web/src/app/le-nhac-duong/loading.tsx`](apps/web/src/app/le-nhac-duong/loading.tsx) (Lễ Nhạc Đường), và [`apps/web/src/app/to-dinh/loading.tsx`](apps/web/src/app/to-dinh/loading.tsx) (Tòa Thánh Bến Tre).
      - Đồng bộ trạng thái loading danh mục tư liệu trong [`LibraryExplorer.tsx`](apps/web/src/components/library/LibraryExplorer.tsx).
  - **Tối ưu Thanh Điều Hướng Header (2026-11-27):**
    + Rút gọn nhãn menu theo yêu cầu: "Lịch Đạo & Ngày Chay" → "Lịch Đạo", "Đạo Sử & Khảo Cứu" → "Đạo Sử".
    + Thêm `whitespace-nowrap` giúp tiêu đề menu hiển thị thẳng hàng trên 1 dòng duy nhất, khắc phục triệt để lỗi chữ bị ngắt xuống 2 dòng trên màn hình desktop/laptop.

## 4. Kế hoạch tiếp theo

1. **Quy ước vận hành máy chủ cục bộ:** AI Assistant **không tự ý chạy tiến trình dev server ngầm** (daemon); để người dùng toàn quyền tự bật/tắt máy chủ (`npm run dev --workspace=apps/web`) tại terminal cá nhân nhằm tránh xung đột cổng `3000`.
2. Người dùng chạy kiểm thử trực tiếp trên trình duyệt (`npm run dev --workspace=apps/web` + `npm run start:dev --workspace=apps/api`) và nghiệm thu **Phase 3**.
3. Commit & Push toàn bộ Phase 3 lên GitHub.
4. Chuyển sang **Phase 4: Document Composer (Soạn Sớ Văn & Biểu Mẫu Nghi Lễ)** khi bạn sẵn sàng.

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

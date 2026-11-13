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
    * Tích hợp bảng màu di sản theo tiêu chuẩn Art Director (`impeccable`): `heritage-paper`, `heritage-parchment`, `heritage-gold`, `heritage-wood` cùng bộ 3 màu sắc chủ đạo Tam Giáo Cao Đài (`caodai-yellow`, `caodai-blue`, `caodai-red`).
    * Thay thế toàn bộ biểu tượng Thiên Nhãn bằng bức tranh tả thực chất chì mỹ thuật do người dùng cung cấp (`apps/web/public/images/thien-nhan.jpg`), hiển thị trọn vẹn nét tôn nghiêm của chân mày, mí mắt và đồng tử tại Logo Header, Banner chính và chân trang.
    * **Điều chỉnh định vị hiển thị giao diện (User-Facing Brand):** Layout Web đối ngoại chính thức sử dụng tên **"Thư Viện Số Cao Đài"** (CaoDai Digital Library / Đại Đạo Tam Kỳ Phổ Độ); trong khi đó, phần lõi hệ thống và dữ liệu giai đoạn MVP vẫn giữ nguyên trọng tâm chuyên biệt vào **Hội Thánh Cao Đài Ban Chỉnh Đạo** (Tòa Thánh Bến Tre), sẵn sàng mở rộng các chi phái khác trong tương lai.
    * Thay thế icon nhận diện chính và Favicon trình duyệt từ Thiên Nhãn sang **Cổ Pháp Tam Giáo của Đạo Cao Đài** (Bình Bát Vu, Cây Phất Chủ, Cổ Bút & Kinh Xuân Thu) kết hợp viền Tam Giáo tại [`apps/web/src/components/CoPhap.tsx`](apps/web/src/components/CoPhap.tsx) và [`apps/web/src/app/icon.svg`](apps/web/src/app/icon.svg); giữ nguyên bức họa Thiên Nhãn thiêng liêng ở Hero Section.
    * Khắc phục triệt để lỗi Webpack Persistent Cache trên Windows (`ENOENT: rename 0.pack.gz_ -> 0.pack.gz` gây 500/404 mất CSS khi F5 dev server) bằng cách cấu hình `config.cache = { type: 'memory' }` trong `apps/web/next.config.mjs`.
    * Đã kiểm thử `npm run build --workspace=@caodai-bcd/web` sạch 100%, tải trang ổn định và không bị lỗi vặt.
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

## 2. Tiến độ Phase 1: Phân Hệ Lịch Đạo & Ngày Chay (Hoàn thành 100%)

Theo kế hoạch chi tiết [`docs/06-planning/PHASE_1_CALENDAR_PLAN.md`](docs/06-planning/PHASE_1_CALENDAR_PLAN.md):

- [x] **Task 1.1 (Hoàn thành):**
  * Xây dựng module thuật toán Âm Dương (chuẩn thiên văn GMT+7 Hồ Ngọc Đức), Can Chi Ngày/Tháng/Năm, 6 Giờ Hoàng Đạo mỗi ngày và logic tính bù ngày ăn chay (Lục trai, Thập trai, Thiên ngươn) khi gặp tháng thiếu trong [`packages/shared/src/calendar/`](packages/shared/src/calendar).
  * Viết bộ Unit Test Jest toàn diện tại [`apps/api/src/calendar/calendar-math.spec.ts`](apps/api/src/calendar/calendar-math.spec.ts) đạt 100% pass (18/18 tests passed).

- [x] **Task 1.2 (Hoàn thành):**
  * Mở rộng `schema.prisma` thêm 3 bảng Lịch Đạo: `ReligiousEvent`, `CalendarRule`, `EventOccurrence`.
  * Thực thi migration `20261113042620_add_calendar_events_schema` vào cơ sở dữ liệu PostgreSQL.
  * Cập nhật `apps/api/prisma/seed.ts` nạp chính xác danh sách **13 Ngày Đại Lễ & Kỷ Niệm chính thức** của Hội Thánh Cao Đài Ban Chỉnh Đạo do người dùng trực tiếp thẩm định.
  * Đã chạy `prisma db seed` thành công vào DB và kiểm tra xác nhận qua Docker `psql`.

- [x] **Task 1.3 (Hoàn thành):**
  * Triển khai `CalendarModule`, `CalendarService`, `CalendarController`, `GetMonthCalendarDto`, `GetDayCalendarDto` trong `apps/api/src/calendar/`.
  * Cung cấp các API: `GET /api/calendar/month`, `GET /api/calendar/day`, `GET /api/calendar/events`.
  * Viết bộ Unit Test cho Service và Controller; toàn bộ 27/27 tests trong `apps/api` pass 100%.

- [x] **Task 1.4 & Nâng cấp UX / UI / Dữ liệu Lịch (Hoàn thành):**
  * **Nâng cấp Bảng Lịch Lớn (Big Calendar Grid):**
    - Tăng kích thước ô ngày từ 104px lên 155px–165px, hiển thị thoáng đãng và dễ đọc.
    - Hiển thị trực diện nhãn **`[🌑 Sóc • Mùng 1]`** (nền tối chữ trắng) và **`[🌕 Vọng • Rằm 15]`** (nền vàng kim) ngay trong từng ô lịch thay vì chỉ là dấu chấm nhỏ.
    - **Tối ưu Bảng Lịch Tròn Trong 1 Khung Hình & Responsive Toàn Diện (Full Viewport Fit):**
      + Bảng lịch tràn toàn bộ bề ngang (lên tới `1720px`), chiều cao được tối ưu hóa gọn gàng để trọn vẹn trong một khung màn hình máy tính mà không cần cuộn dọc dài.
      + Trên mobile: Các ô lịch hiển thị thông minh, ngày Dương to rõ, ngày Âm tinh tế, chỉ báo Sóc/Vọng/Chay/Lễ thu gọn bằng huy hiệu và chấm màu trực quan, chống vỡ giao diện.
    - **Tích Hợp Modal Pop-Up Chi Tiết Ngày ([`DayDetailModal.tsx`](apps/web/src/components/calendar/DayDetailModal.tsx)):**
      + Khi người dùng nhấn vào bất kỳ ngày nào trên bảng lịch (desktop lẫn mobile), một cửa sổ Pop-up trang nhã xuất hiện ngay trên màn hình.
      + Pop-up hiển thị đầy đủ: Ngày Dương lịch, Ngày Âm lịch (tháng đủ/thiếu/nhuận), Can Chi 3 cấp (Ngày/Tháng/Năm), Trai kỳ ăn chay, Danh sách chi tiết các ngày lễ tôn giáo/quốc gia, và **Lưới 12 Khung Giờ (Hoàng Đạo & Hắc Đạo)** với bộ lọc chuyển đổi.
    - **Thêm Thanh Điều Hướng Responsive Mobile ([`Navbar.tsx`](apps/web/src/components/Navbar.tsx)):**
      + Bổ sung nút Hamburger toggle và menu trượt mượt mà (Mobile Drawer) trên điện thoại di động, giúp truy cập nhanh chóng toàn bộ 6 phân hệ.
    - Hiển thị nhãn ngày lễ trọn vẹn, không bị cắt cụt; phân biệt rõ nét:
      + ✨ Lễ Đạo Cao Đài (`caodai-red` / `heritage-gold`).
      + 🇻🇳 Lễ Lớn & Kỷ Niệm Nhà Nước Việt Nam (nền đỏ tươi cờ hoa).
  * **Hiển thị đủ 12 Khung Giờ Trong Ngày (Hoàng Đạo & Hắc Đạo):**
    - Cập nhật thuật toán Thập Nhị Thần Sát (Ngọc Hạp Thông Thư) trong `@caodai-bcd/shared`: Tự động tính chính xác 12 sao chi phối (Thanh Long, Minh Đường, Thiên Hình, Chu Tước, Kim Quỹ, Thiên Đức, Bạch Hổ, Ngọc Đường, Thiên Lao, Huyền Vũ, Tư Mệnh, Câu Trận).
    - Thẻ [`DayDetailCard.tsx`](apps/web/src/components/calendar/DayDetailCard.tsx) hiển thị đầy đủ 12 giờ với bộ lọc chuyển đổi linh hoạt: *Tất cả 12 Giờ*, *6 Giờ Hoàng Đạo (Cát)*, *6 Giờ Hắc Đạo (Hung)*.
  * **Mở rộng Dữ liệu Seed 16 Ngày Lễ Lớn Nhà Nước Việt Nam:**
    - Cập nhật enum `NATIONAL_HOLIDAY` trong `schema.prisma`.
    - Seed đầy đủ 16 ngày lễ lớn: Tết Dương Lịch, Tết Nguyên Đán, Giỗ Tổ Hùng Vương, 30/4, 1/5, Quốc khánh 2/9, 8/3, 20/10, 20/11, 22/12, Tết Đoan Ngọ, Tết Táo Quân, v.v.
    - Nâng cấp bảng tham chiếu [`ReligiousEventsReference.tsx`](apps/web/src/components/calendar/ReligiousEventsReference.tsx) thành 2 tabs tra cứu song hành (Đại Lễ Ban Chỉnh Đạo & Lễ Quốc Gia).
    - Bổ sung bộ lọc sự kiện trực tiếp trên thanh công cụ Lịch: *Tất cả*, *Lễ Đạo Cao Đài*, *Lễ Nhà Nước VN*.
  * **Khắc phục triệt để lỗi Webpack cache chunk `./135.js`:** Cấu hình `"dev": "npm run clean && next dev -p 3000"` trong `apps/web/package.json` tự động dọn cache trước khi boot.

- [x] **Task 1.5 (Hoàn thành) — Tính Năng Dark Mode Toàn Diện Cho Website:**
  * **Cấu hình Tailwind Dark Mode:** Kích hoạt `darkMode: 'class'` tại [`apps/web/tailwind.config.ts`](apps/web/tailwind.config.ts).
  * **Hệ thống CSS Variables Đa Tầng:** Ánh xạ toàn bộ bảng màu di sản `heritage` sang CSS variables với kênh màu RGB và alpha opacity tại [`apps/web/src/app/globals.css`](apps/web/src/app/globals.css).
  * **Phong cách Dark Mode Di Sản Cao Đài (Tam Trấn Dạ Đăng):** 
    - Nền chính: Gỗ mun trầm ấm (`#12100E`).
    - Khối thẻ/panel: Gỗ gụ thâm trầm (`#1D1916`) cùng viền đồng thau cổ (`#382F28`).
    - Ánh sáng điểm xuyết: Vàng hoàng kim dạ đăng rực rỡ (`#F59E0B` / `#FBBF24`).
    - Chữ đọc: Màu ngà voi cổ êm dịu mắt (`#F4EFE6`), chữ phụ xám tro nhạt (`#B8ACA0`).
  * **Quản Lý Trạng Thái Giao Diện ([`ThemeProvider.tsx`](apps/web/src/components/ThemeProvider.tsx)):**
    - Hỗ trợ 3 chế độ: Sáng (`light`), Tối (`dark`), Tự động theo hệ điều hành (`system`).
    - Lưu trạng thái vào `localStorage` (`caodai-theme`), tự động lắng nghe sự kiện thay đổi của hệ thống (`matchMedia`).
    - Script inline chạy tức thì trước khi render DOM chống chớp nháy màn hình (Zero FOUC).
  * **Nút Bấm Chuyển Đổi Giao Diện ([`ThemeToggle.tsx`](apps/web/src/components/ThemeToggle.tsx)):**
    - Tích hợp nút chuyển đổi Mặt Trời ☀️ / Mặt Trăng 🌙 với hiệu ứng xoay góc mượt mà trên Navbar (cả Desktop và Mobile Drawer).
    - Tích hợp bộ điều khiển Segmented Control 3 tùy chọn (`Sáng` / `Tối` / `Hệ thống`) tại chân trang (Footer).
  * **Hoàn Thiện Giao Diện Các Trang:**
    - Cập nhật trang chủ (`/`), thanh Navbar, Footer, bảng Lịch Đạo (`/calendar`), danh mục 29 ngày lễ, và Modal Pop-up 12 Khung Giờ tương thích hoàn hảo cả 2 chế độ sáng và tối.
  * Đã kiểm thử `npm run build --workspace=apps/web` thành công 100% không cảnh báo.

- [x] **Task 1.7 (Hoàn thành) — Tái Cấu Trúc Toàn Diện UI/UX & Khắc Phục Undersized Text:**
  * Khắc phục triệt để lỗi "UNDERSIZED FUNCTIONAL TEXT" (theo ảnh Audit UI của người dùng): Nâng toàn bộ các nhãn chức năng lên tối thiểu `text-xs` (12px) và `text-sm` (14px).
  * Chuyển đổi lưới lịch thành Bảng Lưới Nguyên Khối (Architectural Grid) phẳng, loại bỏ cấu trúc card lồng card và loại bỏ các viền dạ quang neon AI-slop.

- [x] **Task 1.8 (Hoàn thành) — Thiết Kế Lại Toàn Diện Hệ Màu Di Sản Cao Đài & Khắc Phục Lỗi Font Số Âm Lịch:**
  * **Khắc phục triệt để phong cách trắng đen (loại bỏ cảm giác lạnh lẽo, đơn điệu không phù hợp chốn tôn giáo):**
    - Thay thế toàn bộ phong cách trắng đen thuần túy (`zinc-900`/`white`) bằng **Bảng Màu Di Sản Cao Đài Bản Sắc (Heritage Warm Ink & Sacred Tam Giáo)**:
      + **Nền Giấy Điệp / Giấy Dó Cổ (`--bg-canvas: #FDFBF7`, `--bg-surface: #F6F1E6`):** Sắc ngà ấm dịu mắt, gợi chiều sâu thư tịch kinh viện xưa, đọc lâu không mỏi.
      + **Chữ Mực Nho & Gỗ Mun Trầm (`--text-primary: #231812`):** Nâu đen mực tàu cổ kính, tương phản cực cao $\ge 14.5:1$.
      + **Bộ Ba Sắc Di Sản Tam Giáo Cổ Pháp:**
        * **Vàng Hoàng Thổ Trầm (`--caodai-ochre: #A66E16`):** Tôn vinh y bát và đạo phục Phái Thái (Phật đạo), màu sắc điểm xuyết ấm áp, không chói chang.
        * **Xanh Chàm Cổ (`--caodai-indigo: #1E3A66`):** Tôn vinh đạo phục Phái Thượng (Tiên đạo), dùng cho Thứ Bảy và các nhãn tri thức.
        * **Đỏ Son Chu Sa (`--caodai-vermilion: #9E2A2B`):** Tôn vinh sắc phục Phái Ngọc (Nho đạo) và ấn triện truyền thống, dùng cho Chủ Nhật, Đại Lễ Đạo và nút hành động chính.
        * **Xanh Rêu Thanh Trai (`--caodai-pine: #2D5A3D`):** Huy hiệu ngày ăn chay thanh nhã.
    - **Dark Mode (Chốn Tổ Đình Thiền Môn Về Đêm):** Sắc gỗ mun trầm ấm (`#161311`), bề mặt gỗ trắc (`#221C18`), viền đồng thau cổ (`#3D332A`) và chữ ngà voi sáng êm mắt (`#F5EFE6`).
  * **Khắc phục triệt để lỗi "font số âm lịch ở bảng lịch đang bị lỗi to hơn chữ":**
    - Nguyên nhân: Trước đây số ngày âm được đặt trong thẻ riêng với font size/weight khác (`text-xs font-semibold` hoặc `font-bold`), trong khi chữ `ÂL` bị ép thành `text-[11px]` hoặc `text-[10px]` với màu nhạt, dẫn đến số trông to, cao và lấn át hẳn chữ `ÂL`.
    - Giải pháp dứt điểm: Tích hợp cả số ngày âm và chữ `ÂL` trong **cùng 1 thẻ text duy nhất** (`<span className="font-sans text-xs font-semibold tabular-nums leading-none">`), sử dụng cùng font chữ `Plus Jakarta Sans` với cỡ chữ chuẩn mực 12px. Số và chữ giờ đây có cùng chiều cao x-height, tỷ lệ cân đối hoàn hảo và nhỏ hơn ~50% so với số ngày Dương lịch (`font-serif text-xl sm:text-2xl font-bold`).
  * **Đồng bộ hóa 100% các bề mặt ứng dụng:**
    - [`apps/web/src/app/globals.css`](apps/web/src/app/globals.css) & [`apps/web/tailwind.config.ts`](apps/web/tailwind.config.ts): Định nghĩa token chuẩn `caodai-*` và `heritage-*`.
    - [`apps/web/src/components/calendar/CalendarDayCell.tsx`](apps/web/src/components/calendar/CalendarDayCell.tsx): Căn chỉnh tỷ lệ ngày Dương, ngày Âm, huy hiệu Sóc/Vọng/Chay và thanh ngày lễ.
    - [`apps/web/src/app/calendar/page.tsx`](apps/web/src/app/calendar/page.tsx): Header Thứ Bảy (xanh chàm), Chủ Nhật (đỏ chu sa), T2-T6 (mực nho).
    - [`apps/web/src/components/Navbar.tsx`](apps/web/src/components/Navbar.tsx): Nền ngà ấm, viền chỉ sách xưa, logo Cổ Pháp Tam Giáo tinh tế.
    - [`apps/web/src/app/page.tsx`](apps/web/src/app/page.tsx): Khung Thiên Nhãn, thanh tìm kiếm đỏ chu sa, các card chuyên mục viền hoàng thổ trầm.
    - [`apps/web/src/components/calendar/ReligiousEventsReference.tsx`](apps/web/src/components/calendar/ReligiousEventsReference.tsx) & [`ThemeToggle.tsx`](apps/web/src/components/ThemeToggle.tsx).
  * Kiểm thử biên dịch `npm run build --workspace=apps/web` thành công 100% không lỗi.

- [x] **Task 1.9 (Hoàn thành) — Khôi Phục Dải 3 Màu Tam Giáo, Kiến Trúc Phẳng Không Bo Góc & Nâng Cấp Font Tiếng Việt:**
  * **Khôi phục dải 3 màu sắc chủ đạo Tam Giáo Cao Đài (Vàng - Xanh - Đỏ):**
    - Đặt dải `TamGiaoStripe` (`h-1.5 w-full`) tại vị trí **đầu Header** (ngay trên đỉnh thanh Navbar, neo cố định sticky khi cuộn trang) và **đầu Footer** theo đúng biểu tượng thiêng liêng Cờ Đạo (Vàng: Thái Thanh / Xanh: Thượng Thanh / Đỏ: Ngọc Thanh).
  * **Tái cấu trúc Trang Chủ ([`apps/web/src/app/page.tsx`](apps/web/src/app/page.tsx)) — Loại bỏ bo tròn & Card lồng card:**
    - Loại bỏ hoàn toàn các góc bo tròn (`rounded-none`, 0px radius), chuyển sang phong cách kiến trúc phẳng, kẻ chỉ sách xưa đĩnh đạc và uy nghiêm.
    - Tạo khoảng cách thoáng đãng và dễ thở giữa các ô chuyên mục (`gap-5 sm:gap-6`), mỗi ô có viền 1px độc lập thanh nhã (`border border-heritage-border`) với hiệu ứng hover vàng hoàng thổ trầm (`hover:border-caodai-ochre`).
    - Loại bỏ triệt để cấu trúc card lồng card: Bức họa Thiên Nhãn hiển thị trực tiếp và trang trọng ở cột phải Hero mà không bọc thêm hộp card phụ bên ngoài; thanh tìm kiếm phẳng liền khối; các icon và nhãn thể loại trong từng ô chuyên mục hiển thị trực diện, không đóng khung hộp rườm rà.
  * **Nâng cấp Hệ Thống Font Chữ Tiếng Việt ([`apps/web/src/app/layout.tsx`](apps/web/src/app/layout.tsx) & [`globals.css`](apps/web/src/app/globals.css)):**
    - Thay thế font tiêu đề sang **`Lora`**: Khắc phục triệt để hiện tượng nét thanh mảnh vụn vỡ và dấu tiếng Việt bị ép chặt của Playfair Display; các dấu hỏi, ngã, nặng, sắc, huyền hiển thị tròn trịa, thanh thoát, dễ đọc.
    - Thay thế font nội dung sang **`Be Vietnam Pro`**: Font được thiết kế chuyên biệt cho hệ chữ tiếng Việt, khoảng cách dấu tối ưu, độ thoáng dòng thoải mái (`line-height: 1.6`).
    - Xóa bỏ `letter-spacing: -0.015em`, giúp các chữ cái và dấu thanh không bị dính vào nhau.
  * Đã kiểm thử `npm run build --workspace=apps/web` thành công 100% (tải trang nhẹ ~101 kB).
- **Điều chỉnh Thiết Kế Hệ Thống Phase 2 — Tổ Đình Bến Tre & Thánh Sở Thu Gọn (2026-11-13):**
  * **Lý do nghiệp vụ & bảo mật:** Thu gọn danh mục các Thánh Thất địa phương thành một phân mục nhỏ có kiểm soát bảo mật; chuyển trọng tâm chính sang giới thiệu chuyên sâu Cụm Tổ Đình Bến Tre gồm 4 công trình: **Tòa Thánh Bến Tre (An Hội)**, **Điện Thờ Phật Mẫu**, **Nhà Tu Trung Thừa**, **Nhà Tu Thượng Thừa** theo 3 trụ cột **Lịch sử – Xây dựng – Đường đi đến**.
  * **Cập nhật toàn bộ tài liệu đặc tả & kế hoạch:** [`docs/01-business/BRD.md`](docs/01-business/BRD.md), [`docs/01-business/BUSINESS_RULES.md`](docs/01-business/BUSINESS_RULES.md) (`BR-SITE-01..04`), [`docs/02-architecture/SYSTEM_ARCHITECTURE.md`](docs/02-architecture/SYSTEM_ARCHITECTURE.md), [`docs/03-database/DATABASE_SCHEMA.md`](docs/03-database/DATABASE_SCHEMA.md), [`docs/06-planning/DEVELOPMENT_ROADMAP.md`](docs/06-planning/DEVELOPMENT_ROADMAP.md), [`README.md`](README.md), và tạo mới [`docs/06-planning/PHASE_2_TOA_THANH_PLAN.md`](docs/06-planning/PHASE_2_TOA_THANH_PLAN.md).
  * **Cập nhật Database (`apps/api/prisma/schema.prisma`):** Bổ sung `SiteType`, `VisibilityLevel` (`PUBLIC_FEATURED`, `PUBLIC_COMPACT`, `INTERNAL_ONLY`), `SiteSectionType` (`HISTORY`, `ARCHITECTURE`, `DIRECTIONS`), `VerificationStatus`, `OrganizationUnit`, `WorshipSite`, `SiteDetailSection`. Đã kiểm thử `npx prisma validate`.
  * **Cập nhật UX/UI (`apps/web`):** Cập nhật [`Navbar.tsx`](apps/web/src/components/Navbar.tsx) và [`page.tsx`](apps/web/src/app/page.tsx) sang điều hướng `/to-dinh` (**Tòa Thánh Bến Tre**), bổ sung khung hình ảnh, giới thiệu các cơ quan Nội viện, Lễ viện, Dưỡng đường và tinh gọn đoạn mô tả box Tòa Thánh Bến Tre trên trang chủ vừa vặn 3 dòng.
- **Triển khai Phase 2 — Tổ Đình Bến Tre & Thánh Sở Thu Gọn (2026-11-13):**
  * **Seed Data (`apps/api/prisma/seed-sites.ts` & `seed.ts`):** Tạo seed cho 7 công trình trọng tâm tại Tòa Thánh Bến Tre (Tòa Thánh Bến Tre / Thánh thất An Hội cũ, Diêu Trì Bửu Điện, Vườn Kỳ Thọ, Nhà tu Trung thừa Nam, Nhà tu Trung thừa Nữ, Nhà tu Thượng thừa Nam, Nhà tu Thượng thừa Nữ) với 3 trụ cột `HISTORY`, `ARCHITECTURE`, `DIRECTIONS` và danh mục thu gọn `PUBLIC_COMPACT`.
  * **Backend API (`apps/api/src/sites/`):** Xây dựng `SitesModule`, `SitesController`, `SitesService` và unit tests (`sites.service.spec.ts`) cung cấp 3 endpoints: `GET /api/sites/featured`, `GET /api/sites/featured/:slug`, `GET /api/sites/compact`.
  * **Dữ liệu Tòa Thánh Bến Tre:** Đã nghiên cứu và nạp dữ liệu lịch sử, kiến trúc, đường đi chính xác (Hồ sơ Di tích cấp tỉnh 2017: Số 100C đường Trương Định, P.6, TP. Bến Tre; các mốc 1928 Thánh thất An Hội, 1934 Ban Chỉnh Đạo, 1935 Giáo Tông Nguyễn Ngọc Tương, 1947 khởi công Đền Thánh kiên cố; cấu trúc Tam Đài: Hiệp Thiên Đài lầu chuông lầu trống nóc chữ Vạn, Cửu Trùng Đài thềm tiến chín bậc bao lam sơn son thếp vàng, Bát Quái Đài phụng thờ Thiên Nhãn và Quả Càn Khôn).
  * **Frontend (`apps/web/src/app/to-dinh/`):** Xây dựng trang `/to-dinh` và component [`ToDinhExplorer.tsx`](apps/web/src/components/sites/ToDinhExplorer.tsx) hiển thị trọn vẹn 7 công trình trọng tâm, gỡ bỏ phần cơ quan xung quanh theo yêu cầu, tích hợp khung hình ảnh tư liệu, 3 tab Lịch sử - Xây dựng - Đường đi đến, và mục Thánh Thất thu gọn ở cuối trang.
  * **Tích hợp Ảnh Thực Tế (2026-11-14):**
    - Tiếp nhận và lưu trữ 4 ảnh thực tế độ nét cao do người dùng cung cấp vào [`apps/web/public/images/`](apps/web/public/images/):
      + `toa-thanh-ben-tre.jpg`: Ảnh chụp mặt tiền Tòa Thánh Bến Tre với hai tháp Kim Chung - Ngọc Cổ và bảo tháp sân tiền đình.
      + `dieu-tri-buu-dien.jpg`: Ảnh toàn cảnh Diêu Trì Bửu Điện (Điện Thờ Phật Mẫu) uy nghi dưới vòm trời xanh.
      + `dieu-tri-buu-dien-2.jpg`: Ảnh hành lang hàng cột hiên và cờ Đạo.
      + `dieu-tri-buu-dien-3.jpg`: Ảnh cận cảnh các tầng tháp nhiều lớp và hoa văn chạm trổ mái đao.
    - Nâng cấp [`ToDinhExplorer.tsx`](apps/web/src/components/sites/ToDinhExplorer.tsx) với tính năng Gallery: hỗ trợ xem ảnh chính kèm hàng thumbnail các góc ảnh thực tế khác nhau, hiển thị chú thích chi tiết tương ứng, tự động reset index khi chuyển công trình.
    - Cả 2 workspace `apps/api` (30/30 tests passed) và `apps/web` (build thành công 100%) đều sạch và sẵn sàng.
  * **Chạy Migration & Nạp Database PostgreSQL (2026-11-14):**
    - Thực thi migration `20261113174027_add_worship_sites_phase2` tạo thành công các bảng `worship_sites`, `site_detail_sections`, `organization_units` và các enum liên quan vào database PostgreSQL (`caodai_digital_library`).
    - Bổ sung trường `imageUrl` và `imageCaption` vào model `WorshipSite`.
    - Chạy thành công toàn bộ `npx ts-node apps/api/prisma/seed.ts`, nạp trọn vẹn 7 công trình trọng tâm, các mục Lịch sử - Kiến trúc - Đường đi và 4 cơ sở Thánh Thất thu gọn vào CSDL thực tế.

---

## 3. Kế hoạch tiếp theo (Sẵn sàng sang Phase 3)

1. Tiếp nhận tư liệu gốc từ người dùng để cập nhật thêm ảnh thực tế của 5 công trình còn lại khi có.
2. Khởi động **Phase 3 (Thư Viện Đạo & Bộ Đọc Đối Chiếu Bản Scan Gốc)** khi bạn cung cấp bản scan hoặc danh mục kinh sách mẫu đầu tiên.

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

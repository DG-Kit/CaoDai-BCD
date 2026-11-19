# KẾ HOẠCH TRIỂN KHAI CHI TIẾT (SPECKIT-PLAN)
## PHASE 3: THƯ VIỆN ĐẠO & BỘ ĐỌC ĐỐI CHIẾU (CORE DIGITAL LIBRARY & READER)

| Thông tin | Chi tiết |
| :--- | :--- |
| **Mã kế hoạch** | `PLAN-PHASE-3-LIBRARY-001` |
| **Giai đoạn** | **Phase 3 (Phân hệ trọng tâm cốt lõi)** |
| **Ngày lập** | 2026-11-16 |
| **Trạng thái** | 🟡 **PROPOSED (Chờ xác nhận để bắt đầu Slice 3.1)** |
| **Định hướng** | **Hướng A:** Xây dựng hoàn chỉnh khung kiến trúc, CSDL, API & Bộ đọc đối chiếu song song với dữ liệu mẫu chuẩn mực; sẵn sàng nạp kinh sách thật |

---

## 1. Tóm Tắt & Ngữ Cảnh Kỹ Thuật (Summary & Technical Context)

- **Mục tiêu:** Xây dựng phân hệ **Thư Viện Đạo** — kho lưu trữ, tra cứu và đọc kinh sách, Thánh Ngôn, Thánh Giáo, Đạo sử và văn bản của **Hội Thánh Cao Đài Ban Chỉnh Đạo**, đặt tính nguyên bản và đối chiếu nguồn gốc lên hàng đầu.
- **Ngôn ngữ / Nền tảng:** TypeScript Monorepo (`apps/web` dùng Next.js 14 App Router + Tailwind CSS; `apps/api` dùng NestJS 10 + Prisma ORM 5.22; `packages/shared` dùng chung Enums/Types).
- **Lưu trữ:** PostgreSQL 16 (lưu metadata, mục lục, bản văn biên tập) + MinIO Object Storage / thư mục tĩnh `/scans/` (lưu tệp PDF/ảnh scan gốc bất biến kèm mã kiểm tra SHA-256).
- **Kiểm thử:** Jest Unit Tests cho Backend Services/Controllers (`apps/api`) và `next build` / kiểm thử giao diện cho Frontend (`apps/web`).
- **Ràng buộc hiệu năng & UX:** Tải trang nhẹ (`vercel-react-best-practices`), giao diện *Warm Heritage* (0px border-radius, không card lồng card, font `Lora` & `Be Vietnam Pro`, hỗ trợ Light/Dark mode).

---

## 2. Kiểm Tra Tuân Thủ Nguyên Tắc Dự Án (Constitution Check)

Đối chiếu chặt chẽ với [`AGENTS.md`](../../AGENTS.md) và [`BUSINESS_RULES.md`](../01-business/BUSINESS_RULES.md):

| Nguyên tắc | Yêu cầu bắt buộc | Giải pháp áp dụng trong Phase 3 |
| :--- | :--- | :--- |
| **Phạm vi độc lập** | Chỉ tập trung tư liệu Hội Thánh Cao Đài Ban Chỉnh Đạo. | Thêm cờ `isComparativeReference` (mặc định `false`); tài liệu nghiên cứu đối chiếu ngoài hệ phái (nếu có sau này) được tách khu vực riêng, không trộn lẫn vào kinh văn chính thức. |
| **Phân tách 3 cấp (`BR-LIB-01`)** | `Document` ≠ `DocumentEdition` ≠ `DocumentFile`. | Một tác phẩm có thể chứa nhiều ấn bản lịch sử song song (vd: *Bản in 1968*, *Bản in 1995*); **tuyệt đối không tự ý hợp nhất dị bản**. |
| **Bản scan là bằng chứng tối cao** | Giữ nguyên bản gốc, không tự ý sửa từ cổ, chính tả. | Thiết kế **Bộ đọc đối chiếu song song (Split-View Reader)**: một bên hiển thị bản văn điện tử, một bên hiển thị trực tiếp trang PDF/ảnh scan gốc để bạn đọc đối chiếu. |
| **Quy trình xuất bản (`BR-LIB-02`)** | `DRAFT` → `SUBMITTED` → `IN_REVIEW` → `APPROVED` → `PUBLISHED`. | API công khai (`VISITOR`) chỉ truy vấn và trả về các ấn bản có trạng thái `PUBLISHED`. |
| **Không bịa đặt kinh văn** | Khi chưa có tư liệu thật, tuyệt đối không tự sáng tác/điền kinh văn giả. | Sử dụng **dữ liệu khung cấu trúc mẫu** (danh mục chuẩn + 1–2 đầu mục minh họa cấu trúc mục lục & bản scan mẫu ghi rõ `[Dữ liệu khung thử nghiệm giao diện]`). |
| **Tinh gọn giao diện** | Không hiển thị các badge trạng thái xác minh rườm rà ra UI công khai. | Ẩn các nhãn `VERIFIED` / `PENDING_VERIFICATION` trên UI người đọc; chỉ hiển thị thông tin **Nguồn lưu trữ, Ấn bản, Năm phát hành** một cách trang trọng. |

---

## 3. Phase 0: Nghiên Cứu & Quyết Định Kỹ Thuật (Research Decisions)

1. **Hiển thị Bản Scan Gốc (Scan Viewer):**
   - *Quyết định:* Sử dụng trình xem ảnh độ phân giải cao (hỗ trợ zoom/chuyển trang) và trình xem PDF chuẩn trình duyệt (`<iframe>` / `<object>`) cho `SCAN_ORIGINAL_PDF`, thay vì nhúng thư viện `pdfjs-dist` nặng nề ngay từ đầu.
   - *Lý do:* Giữ kích thước bundle JS của Next.js ở mức tối ưu (~100 kB), tải nhanh trên cả máy tính và điện thoại.
2. **Lưu trữ tệp tin (File Storage):**
   - *Quyết định:* Cột `storagePath` lưu đường dẫn tương đối; hỗ trợ đồng thời đường dẫn MinIO S3 (khi cấu hình `MINIO_ENDPOINT`) và đường dẫn tĩnh local `/scans/...` trong `apps/web/public/scans/` cho giai đoạn phát triển/demo. Kèm `checksumSha256` để kiểm soát tính toàn vẹn.
3. **Tìm kiếm Tiếng Việt:**
   - *Quyết định:* Giai đoạn MVP dùng truy vấn tìm kiếm không phân biệt hoa thường (`mode: 'insensitive'`) trên PostgreSQL kết hợp lọc theo danh mục; thiết kế sẵn cấu trúc để nâng cấp lên `tsvector` + `unaccent` khi kho dữ liệu vượt 500 đầu sách.

---

## 4. Phase 1: Thiết Kế Dữ Liệu, API & Giao Diện

### 4.1. Mô hình Dữ liệu (`apps/api/prisma/schema.prisma`)

Bổ sung 6 model và 2 enum cốt lõi cho Thư viện:

- **Enums:**
  - `DocumentEditionStatus`: `DRAFT`, `SUBMITTED`, `IN_REVIEW`, `REVISION_REQUIRED`, `APPROVED`, `PUBLISHED`, `ARCHIVED`, `REJECTED`
  - `DocumentFileType`: `SCAN_ORIGINAL_PDF`, `OPTIMIZED_PDF`, `SCAN_IMAGE`, `AUDIO_MP3`, `COVER_IMAGE`
- **Models:**
  1. `DocumentCategory`: Cây danh mục phân cấp (`id`, `parentId`, `slug`, `name`, `description`, `displayOrder`).
     - *Các danh mục gốc chuẩn bị sẵn:* Kinh Cúng Tứ Thời; Quan Hôn Tang Tế; Thánh Ngôn; Thánh Giáo; Giáo Lý & Luật Pháp; Đạo Sử & Tiểu Sử; Văn Bản Hội Thánh; Nghi Lễ & Lễ Nhạc; Khảo Cứu & Tham Khảo.
  2. `Document`: Đầu mục tác phẩm (`id`, `categoryId`, `slug`, `title`, `authorOrIssuingBody`, `summary`, `isComparativeReference`).
  3. `DocumentEdition`: Ấn bản cụ thể (`id`, `documentId`, `editionLabel`, `publicationYear`, `publisher`, `sourceName`, `archiveReference`, `usagePermission`, `status`, `verificationStatus`, `publishedAt`).
  4. `DocumentFile`: Tệp đính kèm của ấn bản (`id`, `editionId`, `fileType`, `fileName`, `storagePath`, `checksumSha256`, `fileSizeBytes`, `mimeType`).
  5. `DocumentSection`: Mục lục chương/bài kinh (`id`, `editionId`, `parentId`, `slug`, `title`, `orderIndex`, `scanPageStart`, `scanPageEnd`).
  6. `DocumentContent`: Nội dung bản văn điện tử (`id`, `sectionId`, `contentMarkdown`, `originalScanPageRef`, `editorialNote`).

### 4.2. Hợp đồng Backend API (`apps/api/src/library/`)

| Method & Endpoint | Chức năng | Tham số / Ghi chú |
| :--- | :--- | :--- |
| `GET /api/library/categories` | Lấy cây danh mục Thư viện Đạo | Kèm số lượng tác phẩm đã xuất bản trong mỗi danh mục |
| `GET /api/library/documents` | Tra cứu & lọc danh sách tác phẩm | Query: `?category=slug&q=tu-khoa&page=1&limit=12` (Chỉ trả về tác phẩm có ít nhất 1 ấn bản `PUBLISHED`) |
| `GET /api/library/documents/:slug` | Chi tiết tác phẩm & các ấn bản | Trả về metadata tác phẩm + danh sách `editions` (`PUBLISHED`) |
| `GET /api/library/editions/:id` | Chi tiết ấn bản, mục lục & tệp scan | Trả về `sections` dạng cây/danh sách + `files` |
| `GET /api/library/sections/:id` | Đọc nội dung một bài kinh/chương | Trả về `contentMarkdown`, `originalScanPageRef` và thông tin trang scan đối chiếu |

### 4.3. Kiến trúc Giao diện Web (`apps/web`)

1. **Trang Danh Mục & Tra Cứu (`/library`):**
   - Thanh tìm kiếm phẳng toàn chiều rộng (nhập tên kinh, tên tác phẩm, từ khóa).
   - Bộ lọc danh mục theo cấu trúc phân cấp bên trái (hoặc thanh cuộn ngang trên mobile).
   - Danh sách tác phẩm trình bày thoáng đãng (Warm Heritage, viền 1px, 0px radius), hiển thị: *Tên tác phẩm*, *Danh mục*, *Số ấn bản hiện có*, *Tóm tắt ngắn*.
2. **Trang Chi Tiết & Bộ Đọc Đối Chiếu (`/library/[slug]`):**
   - **Header tác phẩm:** Tên tác phẩm, nút chuyển đổi giữa các **Ấn bản** (nếu có nhiều ấn bản), thông tin trích dẫn nguồn lưu trữ.
   - **Không gian Đọc Song Song (Split-View Reader):**
     - *Cột trái (ẩn/hiện linh hoạt):* Mục lục chương / bài kinh.
     - *Khung chính (Bản văn điện tử):* Hiển thị văn bản rõ nét, thanh công cụ điều chỉnh **cỡ chữ (A- / A+)** và chế độ **Bật/Tắt khung đối chiếu bản scan**.
     - *Khung phải (Bản scan gốc):* Hiển thị trực tiếp hình ảnh/PDF trang scan tương ứng với `originalScanPageRef` của bài kinh đang đọc.
   - **Hỗ trợ Mobile:** Trên màn hình nhỏ, chuyển đổi mượt mà giữa 2 tab **[Bản Văn Điện Tử]** và **[Bản Scan Gốc]** để đảm bảo dễ đọc.

---

## 5. Lộ Trình Thực Hiện Theo Vertical Slices

Để đảm bảo an toàn, kiểm thử chặt chẽ từng bước và không làm quá tải hệ thống:

- **Slice 3.1 — Database Schema & Dữ Liệu Khung Mẫu (`apps/api/prisma`):**
  - Cập nhật `schema.prisma` thêm 6 bảng thư viện.
  - Chạy Prisma migration lên PostgreSQL.
  - Viết `seed-library.ts` nạp hệ thống 9 danh mục chuẩn Ban Chỉnh Đạo + 1–2 đầu mục khung thử nghiệm (kèm file scan mẫu placeholder hoặc trang hướng dẫn).
- **Slice 3.2 — Backend Library API & Unit Tests (`apps/api/src/library/`):**
  - Xây dựng `LibraryModule`, `LibraryService`, `LibraryController`, DTOs.
  - Viết unit test kiểm tra lọc danh mục, tìm kiếm và tách biệt ấn bản.
- **Slice 3.3 — Trang Danh Mục Thư Viện (`/library`):**
  - Kết nối trang `/library` trên Navbar và Trang chủ.
  - Giao diện duyệt danh mục, tìm kiếm và xem danh sách tác phẩm (kèm fallback data khi API offline).
- **Slice 3.4 — Bộ Đọc Đối Chiếu Song Song (`/library/[slug]`):**
  - Xây dựng `SplitLibraryReader` (Mục lục + Bản văn + Bản scan gốc + Điều chỉnh cỡ chữ + Trích dẫn nguồn).
  - Kiểm thử `npm run build` và `npm test` toàn diện, cập nhật `HANDOFF.md`.

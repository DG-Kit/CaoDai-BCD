# Kế Hoạch Triển Khai Phase 2: Tổ Đình Bến Tre & Thánh Sở Thu Gọn

| Thông tin | Chi tiết |
| :--- | :--- |
| **Mã tài liệu** | `DOC-PLAN-PHASE2-002` |
| **Phiên bản** | `2.0.0` (Điều chỉnh theo yêu cầu bảo mật) |
| **Trạng thái** | Đang cập nhật đặc tả & schema |
| **Phạm vi chính** | Hội Thánh Cao Đài Ban Chỉnh Đạo — Cụm Tổ Đình Bến Tre |

---

## 1. Bối Cảnh Điều Chỉnh Hệ Thống

Trước đây, Phase 2 dự kiến xây dựng bản đồ GIS công khai toàn bộ hơn 200 Thánh Thất và Họ đạo trên cả nước. Tuy nhiên, **vì tính chất bảo mật và an toàn thông tin của các cơ sở địa phương**, định hướng Phase 2 được điều chỉnh như sau:

1. **Trọng tâm chính (Primary Focus):** Giới thiệu chuyên sâu, bài bản về **4 công trình cốt lõi tại Tổ Đình Bến Tre**:
   - **Tòa Thánh Bến Tre (Tòa Thánh An Hội)**
   - **Điện Thờ Phật Mẫu (Diêu Trì Bửu Điện)**
   - **Nhà Tu Trung Thừa**
   - **Nhà Tu Thượng Thừa**
2. **Trụ cột nội dung bắt buộc cho mỗi công trình trọng tâm:**
   - **Lịch sử (`HISTORY`):** Quá trình hình thành, các mốc thời gian lịch sử, sự kiện gắn liền, kèm nguồn tư liệu đối chiếu.
   - **Xây dựng (`ARCHITECTURE`):** Quá trình kiến thiết, trùng tu, đặc điểm kiến trúc – bài trí, ý nghĩa biểu tượng.
   - **Đường đi đến (`DIRECTIONS`):** Địa chỉ hiện hành, địa chỉ lịch sử (An Hội / Phú Khương), hướng dẫn đường đi, tọa độ chỉ đường (chỉ áp dụng cho công trình trọng tâm công khai).
3. **Phân mục thu gọn (Compact Sub-section):**
   - Mục giới thiệu các Thánh Thất địa phương được **thu gọn thành một phần nhỏ** (ví dụ một tab/mục con bên dưới trang `/to-dinh` hoặc `/worship-sites`), chỉ hiển thị danh sách rút gọn các điểm tiêu biểu đã được xác minh (`PUBLIC_COMPACT`) hoặc giữ ở chế độ nội bộ (`INTERNAL_ONLY`).
   - Không hiển thị bản đồ GIS toàn bộ hơn 200 cơ sở ra công khai.

---

## 2. Thay Đổi Kiến Trúc & Dữ Liệu

### 2.1. Database (`apps/api/prisma/schema.prisma`)
- Bổ sung các enum:
  - `SiteType`: `TOA_THANH`, `DIEN_THO_PHAT_MAU`, `NHA_TU_TRUNG_THUA`, `NHA_TU_THUONG_THUA`, `THANH_THAT`, `HO_DAO`, `OTHER_SITE`
  - `VisibilityLevel`: `PUBLIC_FEATURED` (4 công trình trung tâm), `PUBLIC_COMPACT` (Thánh thất thu gọn), `INTERNAL_ONLY` (chỉ nội bộ quản trị)
  - `SiteSectionType`: `HISTORY`, `ARCHITECTURE`, `DIRECTIONS`
  - `VerificationStatus`: `UNVERIFIED`, `PENDING_VERIFICATION`, `VERIFIED`, `OFFICIALLY_CONFIRMED`
- Bổ sung các model:
  - `OrganizationUnit`: Cây đơn vị tổ chức cha-con.
  - `WorshipSite`: Hồ sơ công trình/thánh sở, có `slug`, `isFeaturedLandmark`, `visibilityLevel`, `currentAddress`, `historicAddress`, `directionsSummary`, `latitude`, `longitude`, `verificationStatus`, `sourceNote`.
  - `SiteDetailSection`: Bảng con lưu các bài viết theo 3 trụ cột `HISTORY`, `ARCHITECTURE`, `DIRECTIONS` cho từng công trình, hỗ trợ nhiều mục con, thứ tự sắp xếp, nguồn trích dẫn (`sourceCitation`) và trạng thái kiểm chứng (`verificationStatus`).

### 2.2. Backend API (`apps/api`)
- `GET /api/sites/featured`: Trả về 4 công trình trọng tâm (`PUBLIC_FEATURED`) kèm đầy đủ các section `HISTORY`, `ARCHITECTURE`, `DIRECTIONS`.
- `GET /api/sites/featured/:slug`: Chi tiết một công trình trọng tâm theo slug (vd: `toa-thanh-ben-tre`, `dien-tho-phat-mau`, `nha-tu-trung-thua`, `nha-tu-thuong-thua`).
- `GET /api/sites/compact`: Trả về danh sách thu gọn (`PUBLIC_COMPACT`) chỉ gồm tên, loại, tỉnh/thành, địa chỉ khái quát — không lộ tọa độ/liên hệ nhạy cảm.

### 2.3. Frontend UX/UI (`apps/web`)
- **Điều hướng (`Navbar.tsx`) & Trang chủ (`page.tsx`):**
  - Đổi tên mục điều hướng từ *Thánh Sở & Họ Đạo* sang **Tổ Đình Bến Tre** (route `/to-dinh`, giữ alias/redirect từ `/worship-sites` nếu cần).
  - Card trên trang chủ giới thiệu trực tiếp 4 công trình trọng tâm (Tòa Thánh Bến Tre, Điện Thờ Phật Mẫu, Nhà Tu Trung Thừa, Nhà Tu Thượng Thừa) với 3 trục nội dung (Lịch sử, Xây dựng, Đường đi đến).
- **Trang chi tiết `/to-dinh` (Slice tiếp theo):**
  - Bố cục trang nghiêm (Warm Heritage, không card lồng card):
    1. Hero giới thiệu Cụm Tổ Đình Bến Tre.
    2. 4 khối/tab công trình chính: **Tòa Thánh Bến Tre** | **Điện Thờ Phật Mẫu** | **Nhà Tu Trung Thừa** | **Nhà Tu Thượng Thừa**, mỗi công trình có 3 tab/phần: *Lịch sử*, *Xây dựng*, *Đường đi đến*.
    3. Một mục nhỏ ở cuối trang: **Hệ thống Thánh Thất trực thuộc (Thu gọn)** hiển thị danh sách tóm tắt có bảo mật thông tin.

---

## 3. Nguyên Tắc Dữ Liệu & Xác Minh

- Mọi thông tin về năm xây dựng, diện tích, kiến trúc, nhân vật lịch sử của 4 công trình phải đối chiếu từ tư liệu xác thực của Hội Thánh Cao Đài Ban Chỉnh Đạo hoặc địa phương chí đáng tin cậy.
- Những thông tin chưa có nguồn xác minh rõ ràng phải gắn trạng thái `PENDING_VERIFICATION` và ghi chú `[Chờ xác minh tư liệu]`, tuyệt đối không tự suy diễn.


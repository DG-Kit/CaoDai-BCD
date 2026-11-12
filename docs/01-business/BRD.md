# Business Requirements Document (BRD)
## Dự án: Ban Chỉnh Đạo Digital Library (Thư viện số Cao Đài Ban Chỉnh Đạo)

| Thông tin | Chi tiết |
| :--- | :--- |
| **Mã tài liệu** | `DOC-BUS-BRD-001` |
| **Phiên bản** | `1.0.0` |
| **Trạng thái** | `PROPOSED (Chờ phê duyệt)` |
| **Ngôn ngữ chính** | Tiếng Việt |
| **Căn cứ nền tảng** | [`AGENTS.md`](../../AGENTS.md) |

---

## 1. Tầm Nhìn & Mục Tiêu Nghiệp Vụ (Product Vision & Business Objectives)

### 1.1. Tuyên bố tầm nhìn
Xây dựng một nền tảng thư viện số, tra cứu và lưu trữ tri thức chuyên biệt, chuẩn xác và có nguồn gốc rõ ràng về **Hội Thánh Cao Đài Ban Chỉnh Đạo** (Tòa Thánh Bến Tre / An Hội), lấy việc bảo tồn di sản văn hóa, kinh văn lịch sử và kết nối cộng đồng tín đồ làm trọng tâm.

### 1.2. Tuyên bố pháp lý & trung lập
- Nền tảng tự giới thiệu trung lập là dự án nghiên cứu, số hóa và lưu trữ tư liệu độc lập.
- Không tự tuyên bố là trang thông tin điện tử chính thức, cơ quan phát ngôn hay đại diện của Hội Thánh khi chưa có văn bản ủy quyền chính thức.
- Dữ liệu từ các Hội Thánh/chi phái Cao Đài khác chỉ được lưu ở khu vực đối chiếu/nghiên cứu riêng, gắn nhãn rõ ràng, không hiển thị như kinh văn chính thức của Ban Chỉnh Đạo.

### 1.3. Mục tiêu cụ thể
1. **Số hóa & Bảo tồn:** Lưu trữ bền vững các ấn bản Kinh Cúng Tứ Thời, Quan Hôn Tang Tế, Thánh Ngôn, Thánh Giáo, Đạo sử, Tạp chí và Văn bản Hội Thánh kèm bản scan gốc đối chiếu.
2. **Lịch Đạo chính xác:** Tra cứu lịch âm – dương, ngày lễ, ngày vía chuẩn xác theo múi giờ `Asia/Ho_Chi_Minh` và nguồn kiểm duyệt của Ban Chỉnh Đạo.
3. **Bản đồ Thánh sở:** Định vị địa lý và lưu trữ hồ sơ, lịch sử hành chính của Tòa Thánh, Họ đạo, Thánh Thất, Nhà tu thuộc Ban Chỉnh Đạo.
4. **Hỗ trợ nghi lễ & hành chánh:** Soạn thảo, in ấn sớ văn, biểu mẫu nghi lễ theo mẫu chuẩn đã được xác minh.
5. **Nghiên cứu & Học tập:** Xây dựng từ điển thuật ngữ, tiểu sử chức sắc tiền bối có trích dẫn nguồn lưu trữ minh bạch.

---

## 2. Các Bên Liên Quan & Vai Trò Hệ Thống (Stakeholders & Scoped RBAC)

Quyền hạn trong hệ thống là **vai trò trên phần mềm**, không đại diện cho phẩm trật hay thẩm quyền tôn giáo. Áp dụng cơ chế **Scoped RBAC** (phân quyền theo phạm vi đơn vị `organization_unit` / `worship_site`):

| Vai trò (Role) | Phạm vi (Scope) | Trách nhiệm & Quyền hạn nghiệp vụ |
| :--- | :--- | :--- |
| **`VISITOR`** | Công khai | Xem kinh sách đã xuất bản, tra cứu lịch Đạo, xem bản đồ cơ sở thờ tự, tìm kiếm bài giảng/bài viết công khai. Không cần đăng nhập. |
| **`MEMBER`** | Tài khoản cá nhân | Lưu dấu trang, lịch sử đọc, tài liệu yêu thích, soạn và lưu trữ sớ văn/biểu mẫu cá nhân, gửi đề xuất đóng góp/báo sai lệch dữ liệu. |
| **`UNIT_ADMIN`** | Cơ sở cụ thể (`worship_site`) | Quản lý thông tin liên hệ, ảnh chụp, lịch sinh hoạt tại Họ đạo/Thánh Thất được giao. Không có quyền sửa đổi kinh văn hay giáo lý. |
| **`LIBRARY_EDITOR`** | Phân hệ Thư viện | Nhập metadata, tải bản scan, chạy OCR tạo bản nháp, đối chiếu bản số hóa với bản gốc, gửi duyệt ấn bản. |
| **`REVIEWER`** | Chuyên môn được giao | Thẩm định nội dung số hóa, kiểm tra nguồn gốc, phê duyệt hoặc yêu cầu chỉnh sửa tài liệu/lịch lễ/địa điểm trước khi xuất bản. |
| **`SYSTEM_ADMIN`** | Toàn hệ thống | Quản trị kỹ thuật, tài khoản người dùng, phân quyền, cấu hình hạ tầng và xem `audit_logs`. Không mặc nhiên có thẩm quyền xác nhận tính chính thống tôn giáo. |

---

## 3. 6 Phân Hệ Nghiệp Vụ Cốt Lõi (Core Business Domains)

```mermaid
mindmap
  root((Ban Chỉnh Đạo Digital Library))
    Thư Viện Đạo
      Kinh Cúng Tứ Thời
      Quan Hôn Tang Tế
      Thánh Ngôn & Thánh Giáo
      Đạo sử & Tiểu sử
      Văn bản Hội Thánh & Tạp chí
      Trình đọc song song Scan vs Text
    Lịch Đạo
      Lịch Âm Dương chuẩn VN
      Định nghĩa sự kiện vs Lần diễn ra
      Quy tắc lặp & Tháng nhuận
      Lịch sự kiện tại cơ sở
    Hệ Thống Thánh Sở
      Tòa Thánh Bến Tre
      Họ đạo & Thánh Thất
      Nhà tu & Cơ sở trực thuộc
      Bản đồ số & Tọa độ GIS
      Lịch sử địa giới hành chính
    Soạn Tài Liệu
      Mẫu sớ văn chuẩn duyệt
      Biểu mẫu Quan Hôn Tang Tế
      Xem trước & Xuất PDF/Word A4
      Bảo mật dữ liệu cá nhân
    Nghiên Cứu & Học Đạo
      Từ điển thuật ngữ & Điển cố
      Tiểu sử nhân vật tiền bối
      Liên kết tri thức có dẫn nguồn
    Quản Trị & Kiểm Duyệt
      Workflow: Draft -> Review -> Publish
      Lịch sử sửa đổi Revisions
      Ghi vết kiểm toán Audit Logs
```

---

## 4. Nguyên Tắc Nghiệp Vụ Tối Thượng (Business Invariants)

1. **Bản scan gốc là bằng chứng tối cao:**
   - OCR chỉ sinh văn bản nháp.
   - Không tự ý sửa lỗi chính tả, từ cổ, dấu câu, dị bản trong kinh văn nếu chưa có người có thẩm quyền phê duyệt đối chiếu.
   - Luôn hiển thị song song hoặc cho phép người dùng mở bản scan gốc để tự kiểm chứng.
2. **Trạng thái xác minh dữ liệu bắt buộc:**
   - Mọi bản ghi (tài liệu, sự kiện lịch, địa điểm) đều phải gắn 1 trong 3 trạng thái:
     * `UNVERIFIED`: Chưa xác minh (chỉ lưu nội bộ hoặc nhãn tham khảo).
     * `VERIFIED`: Đã đối chiếu với tư liệu/ấn bản đáng tin cậy.
     * `OFFICIALLY_CONFIRMED`: Có văn bản/xác nhận từ người có thẩm quyền phù hợp.
3. **Bất biến của file lưu trữ:**
   - Tệp scan gốc tải lên là bất biến (immutable). Khi cần thay thế, hệ thống tạo bản ghi phiên bản mới (`revision`), không ghi đè file cũ để bảo toàn tính toàn vẹn lịch sử.
4. **Không suy diễn giáo lý/kinh văn:**
   - Không dùng AI để tự sáng tác, diễn giải kinh văn hoặc tự suy diễn ngày lễ. AI chỉ phục vụ tìm kiếm, OCR bản nháp và định dạng văn bản.


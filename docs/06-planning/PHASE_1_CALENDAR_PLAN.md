# KẾ HOẠCH TRIỂN KHAI CHI TIẾT (SPECKIT-PLAN)
## PHASE 1: PHÂN HỆ LỊCH ĐẠO & NGÀY CHAY (RELIGIOUS CALENDAR)

| Thông tin | Chi tiết |
| :--- | :--- |
| **Mã kế hoạch** | `PLAN-PHASE-1-CALENDAR-001` |
| **Giai đoạn** | **Phase 1 (Ưu tiên số 1)** |
| **Ngày lập** | 2026-11-13 |
| **Trạng thái** | 🟢 **COMPLETED (Đã hoàn thành và kiểm thử toàn bộ 5/5 tasks Phase 1)** |
| **Người lập** | Antigravity AI Assistant |

---

## 1. Mục Tiêu & Phạm Vi (Scope & Objectives)

### 1.1. Mục tiêu
Xây dựng một hệ thống Lịch Đạo chuẩn xác, trang nghiêm và tiện ích dành cho đồng đạo và độc giả:
- Tra cứu lịch Âm – Dương chuẩn xác theo múi giờ Việt Nam (`Asia/Ho_Chi_Minh` / GMT+7).
- Đánh dấu chính xác các ngày Sóc (mùng 1), ngày Vọng (rằm) và các ngày Đại Lễ, ngày Vía lớn trong Đạo Cao Đài.
- Hỗ trợ các bộ lọc lựa chọn hiển thị ngày ăn chay (Trai kỳ): **Lục trai**, **Thập trai**, hoặc **Thiên Ngươn / Trường trai** (tự động xử lý tháng thiếu).
- Hiển thị đầy đủ **Can Chi** (của Ngày, Tháng, Năm) và danh sách **Giờ Hoàng Đạo** của từng ngày theo truyền thống văn hóa phương Đông.
- Giao diện thân thiện, trực quan, êm mắt với phong cách di sản truyền thống trên cả máy tính lẫn điện thoại di động.

---

## 2. Kiến Trúc Kỹ Thuật (Architecture & Components)

### 2.1. Thư viện dùng chung (`packages/shared/src/calendar/`)
Để đảm bảo tính toán siêu tốc và nhất quán, thuật toán Âm Dương và Can Chi sẽ được đóng gói thành module TypeScript thuần trong `@caodai-bcd/shared`:
- **Thuật toán Âm Dương:** Dựa trên thuật toán thiên văn chuẩn của GS. Hồ Ngọc Đức (tính chính xác vĩ độ kinh độ mặt trời, tuần trăng, tháng nhuận và tiết khí cho múi giờ GMT+7).
- **Thuật toán Can Chi:** Tính toán Can Chi của Ngày (dựa trên Julian Day Number), Tháng (theo tiết khí & ngũ hổ độn), Năm (theo lục thập hoa giáp).
- **Thuật toán Giờ Hoàng Đạo:** Tính toán 6 giờ Hoàng đạo trong ngày dựa theo Can Ngày và Chi Ngày (Thanh Long, Minh Đường, Kim Quỹ, Thiên Đức, Ngọc Đường, Tư Mệnh).
- **Thuật toán Trai kỳ:**
  * *Lục trai:* Mùng 8, 14, 15, 23, 29, 30 (nếu tháng thiếu 29 ngày: bù ăn ngày 28, 29).
  * *Thập trai:* Mùng 1, 8, 14, 15, 18, 23, 24, 28, 29, 30 (nếu tháng thiếu: bù ăn 27, 28, 29).
  * *Thiên Ngươn:* Toàn bộ các ngày trong tháng giêng (Thượng Ngươn), tháng 7 (Trung Ngươn), tháng 10 (Hạ Ngươn) hoặc ăn chay trường.

---

## 3. Thiết Kế Cơ Sở Dữ Liệu (Database Schema)

Cập nhật `schema.prisma` trong `apps/api` bổ sung các bảng Lịch Đạo:

```prisma
// 1. Định nghĩa Sự kiện / Ngày lễ Đạo
model ReligiousEvent {
  id          String   @id @default(uuid()) @db.Uuid
  code        String   @unique @db.VarChar(100)
  title       String   @db.VarChar(255)
  description String?  @db.Text
  category    String   @default("MAJOR_HOLIDAY") @db.VarChar(50) // MAJOR_HOLIDAY, COMMEMORATION, LOCAL_EVENT
  isRecurring Boolean  @default(true) @map("is_recurring")

  rules       CalendarRule[]
  occurrences EventOccurrence[]

  createdAt   DateTime @default(now()) @map("created_at") @db.Timestamptz
  updatedAt   DateTime @updatedAt @map("updated_at") @db.Timestamptz

  @@map("religious_events")
}

// 2. Quy tắc lặp lịch (Âm lịch / Dương lịch)
model CalendarRule {
  id              String         @id @default(uuid()) @db.Uuid
  eventId         String         @map("event_id") @db.Uuid
  event           ReligiousEvent @relation(fields: [eventId], references: [id], onDelete: Cascade)
  isLunar         Boolean        @default(true) @map("is_lunar")
  lunarMonth      Int?           @map("lunar_month")
  lunarDay        Int?           @map("lunar_day")
  solarMonth      Int?           @map("solar_month")
  solarDay        Int?           @map("solar_day")
  applyLeapMonth  Boolean        @default(false) @map("apply_leap_month")

  createdAt       DateTime       @default(now()) @map("created_at") @db.Timestamptz

  @@map("calendar_rules")
}

// 3. Lần diễn ra sự kiện cụ thể trong từng năm
model EventOccurrence {
  id            String         @id @default(uuid()) @db.Uuid
  eventId       String         @map("event_id") @db.Uuid
  event         ReligiousEvent @relation(fields: [eventId], references: [id], onDelete: Cascade)
  
  solarDate     DateTime       @map("solar_date") @db.Date
  lunarDateStr  String         @map("lunar_date_str") @db.VarChar(50) // VD: "15/10/Bính Ngọ"
  canChiDay     String?        @map("can_chi_day") @db.VarChar(50)
  canChiMonth   String?        @map("can_chi_month") @db.VarChar(50)
  canChiYear    String?        @map("can_chi_year") @db.VarChar(50)
  
  isMajorHoliday Boolean       @default(false) @map("is_major_holiday")
  notes         String?        @db.Text

  createdAt     DateTime       @default(now()) @map("created_at") @db.Timestamptz

  @@unique([eventId, solarDate])
  @@index([solarDate])
  @@map("event_occurrences")
}
```

---

## 4. Thiết Kế API Backend (NestJS - `CalendarModule`)

Tạo module `apps/api/src/calendar/`:
1. `GET /api/calendar/month`:
   - **Tham số:** `year` (ví dụ 2026), `month` (1–12), `fasting` (`NONE` | `LUC_TRAI` | `THAP_TRAI` | `THIEN_NGUON`).
   - **Phản hồi:** Danh sách từng ngày trong tháng gồm:
     * `solarDate`: `2026-11-13` (Ngày Dương, Thứ)
     * `lunarDate`: Ngày Âm, Tháng Âm, Năm Âm, Tháng nhuận (`true`/`false`)
     * `isSocVong`: `true` nếu là Mùng 1 hoặc Rằm (15)
     * `canChi`: `{ day: 'Tân Hợi', month: 'Kỷ Hợi', year: 'Bính Ngọ' }`
     * `hoangDaoHours`: `['Sửu', 'Thìn', 'Ngọ', 'Mùi', 'Tuất', 'Hợi']`
     * `isFastingDay`: `true`/`false` (căn cứ theo chế độ ăn chay được chọn)
     * `events`: Danh sách ngày lễ vía (nếu có, ví dụ: Hạ Ngươn, Vía Đức Chí Tôn...)
2. `GET /api/calendar/day`:
   - Xem chi tiết 1 ngày cụ thể (tiết khí, phân tích giờ hoàng đạo, sự kiện lịch sử).
3. `GET /api/calendar/events`:
   - Danh mục các ngày lễ và ngày vía lớn trong năm của Đạo Cao Đài.

---

## 5. Thiết Kế Giao Diện Frontend (Next.js - `/calendar`)

Xây dựng trang Lịch Đạo tại `apps/web/src/app/calendar/page.tsx`:
1. **Thanh điều hướng Tháng / Năm:**
   - Nút chọn Tháng trước, Tháng sau, nút "Hôm nay" để quay về ngày hiện tại.
   - Hiển thị rõ ràng: Tháng Dương lịch & Tháng Âm lịch song hành.
2. **Bảng Lịch Tháng (Calendar Grid):**
   - 7 cột (Thứ Hai $\rightarrow$ Chủ Nhật).
   - Mỗi ô ngày gồm:
     * Số ngày Dương lịch (in đậm, to, dễ nhìn).
     * Số ngày Âm lịch (in nhỏ hơn ở góc, hiển thị tên tháng nếu là mùng 1 âm).
     * Dấu chấm vàng biểu thị ngày Sóc / Vọng (Mùng 1 & Rằm).
     * Dấu chấm xanh lá biểu thị **Ngày Ăn Chay** (chỉ hiện khi người dùng chọn chế độ ăn chay).
     * Nhãn sự kiện nổi bật (nếu có lễ vía lớn).
3. **Bảng Điều Khiển Tùy Chọn Bên Cạnh (Sidebar Options):**
   - **Tùy chọn ăn chay:** Nút chuyển nhanh giữa `[Không hiển thị]`, `[Lục trai]`, `[Thập trai]`, `[Thiên Ngươn]`.
   - **Tùy chọn Can Chi:** Checkbox `[x] Hiển thị Can Chi ngày/tháng/năm`.
   - **Tùy chọn Giờ Hoàng Đạo:** Checkbox `[x] Hiển thị Giờ Hoàng Đạo`.
4. **Khối Chi Tiết Ngày Được Chọn (Selected Day Card):**
   - Khi bấm vào ngày bất kỳ, hiển thị thẻ thông tin trang nhã:
     * Ngày Dương: Thứ Sáu, ngày 13 tháng 11 năm 2026.
     * Ngày Âm: Ngày 05 tháng 10 năm Bính Ngọ.
     * Can Chi: Ngày Tân Hợi, Tháng Kỷ Hợi, Năm Bính Ngọ.
     * Giờ Hoàng Đạo trong ngày: Sửu (01h-03h), Thìn (07h-09h), Ngọ (11h-13h), Mùi (13h-15h), Tuất (19h-21h), Hợi (21h-23h).
     * Trạng thái ngày chay & Ý nghĩa ngày vía (nếu trùng ngày lễ).

---

## 6. Phân Chia Công Việc Cụ Thể (Task Breakdown)

- [x] **Task 1.1:** Viết module tính toán Âm Dương, Can Chi, Giờ Hoàng Đạo và Trai kỳ trong `packages/shared/src/calendar/` kèm Unit Test Jest đạt 100% pass (18/18 tests pass).
- [x] **Task 1.2:** Mở rộng `schema.prisma` (`ReligiousEvent`, `CalendarRule`, `EventOccurrence`), tạo migration `20261113042620_add_calendar_events_schema` và nạp seed dữ liệu 13 ngày đại lễ chính xác của Hội Thánh Cao Đài Ban Chỉnh Đạo (người dùng đã thẩm định).
- [x] **Task 1.3:** Triển khai `CalendarModule` trong `apps/api` (Controller, Service, DTO, Unit Test 27/27 pass 100%).
- [x] **Task 1.4:** Triển khai Giao diện Lịch Đạo tại `apps/web/src/app/calendar/page.tsx` tích hợp đầy đủ bảng tháng, bộ lọc ăn chay, Can Chi, 6 Giờ Hoàng Đạo và thẻ chi tiết ngày chọn.
- [x] **Task 1.5:** Kiểm thử toàn diện e2e (F5 không vỡ giao diện, chuyển đổi các tháng, kiểm tra tính toán tháng nhuận/tháng thiếu), cập nhật `HANDOFF.md` và commit push Git.

---

## 7. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

1. Mọi phép tính Âm - Dương khớp 100% với lịch thiên văn Việt Nam (GMT+7).
2. Khi bật "Lục trai" hoặc "Thập trai", hệ thống đánh dấu chuẩn xác các ngày chay và tự động tính bù khi gặp tháng thiếu (29 ngày).
3. Hiển thị đúng Can Chi và 6 giờ Hoàng Đạo của từng ngày.
4. Giao diện trang nhã, không lỗi font, không phát sinh lỗi 500/404 khi tải hoặc F5 trang.
5. 100% test pass và toàn bộ Monorepo build thành công.


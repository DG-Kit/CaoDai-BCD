/**
 * @file events.ts - Danh Mục Ngày Đại Lễ & Kỷ Niệm (Đạo Cao Đài & Nhà Nước Việt Nam)
 * @description Bao gồm 13 ngày lễ chính thức Cao Đài Ban Chỉnh Đạo & 16 ngày lễ lớn Nhà nước Việt Nam.
 */

export type EventCategoryType =
  | 'MAJOR_HOLIDAY'
  | 'COMMEMORATION'
  | 'TRADITIONAL_FESTIVAL'
  | 'NATIONAL_HOLIDAY';

export interface ReligiousEventItem {
  code: string;
  title: string;
  category: EventCategoryType;
  description: string;
  isLunar: boolean;
  lunarMonth?: number;
  lunarDayStart?: number;
  lunarDayEnd?: number;
  solarMonth?: number;
  solarDayStart?: number;
  solarDayEnd?: number;
  dateRangeStr: string;
}

// 1. 13 Ngày Đại Lễ & Kỷ Niệm Chính Thức Hội Thánh Cao Đài Ban Chỉnh Đạo
export const VERIFIED_RELIGIOUS_EVENTS: ReligiousEventItem[] = [
  {
    code: 'VIA_DUC_CHI_TON',
    title: 'Đại lễ Vía Đức Chí Tôn',
    category: 'MAJOR_HOLIDAY',
    description: 'Đại lễ Vía Đức Ngọc Hoàng Thượng Đế (Đức Chí Tôn - Đấng Đại Từ Phụ).',
    isLunar: true,
    lunarMonth: 1,
    lunarDayStart: 8,
    lunarDayEnd: 9,
    dateRangeStr: '08 – 09/01 Âm lịch',
  },
  {
    code: 'THUONG_NGUON',
    title: 'Đại lễ Thượng Nguơn',
    category: 'MAJOR_HOLIDAY',
    description: 'Đại lễ Thượng Nguơn - Cầu an đầu năm.',
    isLunar: true,
    lunarMonth: 1,
    lunarDayStart: 14,
    lunarDayEnd: 15,
    dateRangeStr: '14 – 15/01 Âm lịch',
  },
  {
    code: 'VIA_THAI_THUONG_DAO_TO',
    title: 'Đại lễ Vía Đức Thái Thượng Đạo Tổ',
    category: 'MAJOR_HOLIDAY',
    description: 'Đại lễ Vía Đức Thái Thượng Đạo Tổ (Lão Tử - Đạo giáo).',
    isLunar: true,
    lunarMonth: 2,
    lunarDayStart: 14,
    lunarDayEnd: 15,
    dateRangeStr: '14 – 15/02 Âm lịch',
  },
  {
    code: 'KY_NIEM_GIAO_TONG_DAC_DAO',
    title: 'Lễ Kỷ niệm Đức Giáo Tông Nguyễn Ngọc Tương đắc đạo',
    category: 'COMMEMORATION',
    description: 'Kỷ niệm ngày Đức Giáo Tông Nguyễn Ngọc Tương đắc đạo.',
    isLunar: true,
    lunarMonth: 2,
    lunarDayStart: 24,
    lunarDayEnd: 25,
    dateRangeStr: '24 – 25/02 Âm lịch',
  },
  {
    code: 'KY_NIEM_GIAO_TONG_THO_PHONG',
    title: 'Lễ Kỷ niệm Đức Giáo Tông Nguyễn Ngọc Tương thọ phong lý Giáo Tông nơi Thiên Đình',
    category: 'COMMEMORATION',
    description: 'Kỷ niệm ngày Đức Giáo Tông Nguyễn Ngọc Tương thọ phong lý Giáo Tông nơi Thiên Đình.',
    isLunar: true,
    lunarMonth: 3,
    lunarDayStart: 13,
    lunarDayEnd: 13,
    dateRangeStr: '13/03 Âm lịch',
  },
  {
    code: 'PHAT_DAN_THICH_CA',
    title: 'Đại lễ Phật Đản Đức Thích Ca Mâu Ni',
    category: 'MAJOR_HOLIDAY',
    description: 'Đại lễ Kỷ niệm Phật Đản Đức Thích Ca Mâu Ni (Phật giáo).',
    isLunar: true,
    lunarMonth: 4,
    lunarDayStart: 7,
    lunarDayEnd: 8,
    dateRangeStr: '07 – 08/04 Âm lịch',
  },
  {
    code: 'KY_NIEM_RA_TINH_GIAO_TONG',
    title: 'Lễ Kỷ niệm "Ra Tịnh" của Đức Giáo Tông',
    category: 'COMMEMORATION',
    description: 'Kỷ niệm ngày "Ra Tịnh" của Đức Giáo Tông Nguyễn Ngọc Tương.',
    isLunar: true,
    lunarMonth: 5,
    lunarDayStart: 15,
    lunarDayEnd: 15,
    dateRangeStr: '15/05 Âm lịch',
  },
  {
    code: 'SINH_NHAT_GIAO_TONG',
    title: 'Đại lễ Sinh nhật Đức Giáo Tông Nguyễn Ngọc Tương',
    category: 'COMMEMORATION',
    description: 'Đại lễ Kỷ niệm ngày sinh nhật của Đức Giáo Tông Nguyễn Ngọc Tương.',
    isLunar: true,
    lunarMonth: 5,
    lunarDayStart: 25,
    lunarDayEnd: 26,
    dateRangeStr: '25 – 26/05 Âm lịch',
  },
  {
    code: 'KY_NIEM_THUONG_CHUONG_PHAP_DANG_TIEN',
    title: 'Lễ Kỷ niệm Đức Thượng Chưởng Pháp Lê Bá Trang đăng tiên',
    category: 'COMMEMORATION',
    description: 'Kỷ niệm ngày Đức Thượng Chưởng Pháp Lê Bá Trang đăng tiên.',
    isLunar: true,
    lunarMonth: 5,
    lunarDayStart: 29,
    lunarDayEnd: 29,
    dateRangeStr: '29/05 Âm lịch',
  },
  {
    code: 'TRUNG_NGUON',
    title: 'Đại lễ Trung Nguơn',
    category: 'MAJOR_HOLIDAY',
    description: 'Đại lễ Trung Nguơn - Cầu siêu xá tội vong nhân.',
    isLunar: true,
    lunarMonth: 7,
    lunarDayStart: 14,
    lunarDayEnd: 15,
    dateRangeStr: '14 – 15/07 Âm lịch',
  },
  {
    code: 'VIA_DUC_DIEU_TRI_KIM_MAU',
    title: 'Đại lễ Vía Đức Diêu Trì Kim Mẫu, Trung thu Tết nhi đồng',
    category: 'MAJOR_HOLIDAY',
    description: 'Đại lễ Hội Yến Diêu Trì Cung và Tết Trung Thu Nhi Đồng.',
    isLunar: true,
    lunarMonth: 8,
    lunarDayStart: 14,
    lunarDayEnd: 15,
    dateRangeStr: '14 – 15/08 Âm lịch',
  },
  {
    code: 'HA_NGUON_KHAI_DAO',
    title: 'Đại lễ Hạ Nguơn - Kỷ niệm Khai đạo',
    category: 'MAJOR_HOLIDAY',
    description: 'Đại lễ Hạ Nguơn và Kỷ niệm Ngày Hoằng Khai Đại Đạo Tam Kỳ Phổ Độ.',
    isLunar: true,
    lunarMonth: 10,
    lunarDayStart: 14,
    lunarDayEnd: 15,
    dateRangeStr: '14 – 15/10 Âm lịch',
  },
  {
    code: 'GIANG_SINH_GIA_TO',
    title: 'Đại lễ Giáng sinh Đức Gia Tô Giáo Chủ',
    category: 'MAJOR_HOLIDAY',
    description: 'Đại lễ Kỷ niệm Giáng sinh Đức Gia Tô Giáo Chủ (Chúa Giê-su - Kitô giáo).',
    isLunar: false,
    solarMonth: 12,
    solarDayStart: 24,
    solarDayEnd: 25,
    dateRangeStr: '24 – 25/12 Dương lịch',
  },
];

// 2. 16 Ngày Lễ Lớn & Kỷ Niệm Nhà Nước Việt Nam
export const VERIFIED_NATIONAL_EVENTS: ReligiousEventItem[] = [
  {
    code: 'TET_DUONG_LICH',
    title: 'Tết Dương Lịch',
    category: 'NATIONAL_HOLIDAY',
    description: 'Tết Dương Lịch - Ngày đầu năm mới theo lịch Gregory (Nghỉ lễ toàn quốc).',
    isLunar: false,
    solarMonth: 1,
    solarDayStart: 1,
    solarDayEnd: 1,
    dateRangeStr: '01/01 Dương lịch',
  },
  {
    code: 'TET_NGUYEN_DAN',
    title: 'Tết Nguyên Đán (Tết Cổ Truyền)',
    category: 'NATIONAL_HOLIDAY',
    description: 'Tết Nguyên Đán - Lễ hội truyền thống đón năm mới lớn nhất của dân tộc Việt Nam.',
    isLunar: true,
    lunarMonth: 1,
    lunarDayStart: 1,
    lunarDayEnd: 3,
    dateRangeStr: '01 – 03/01 Âm lịch',
  },
  {
    code: 'NGAY_THAY_THUOC_VN',
    title: 'Ngày Thầy thuốc Việt Nam',
    category: 'NATIONAL_HOLIDAY',
    description: 'Kỷ niệm Ngày Thầy thuốc Việt Nam - Tôn vinh y đức và đội ngũ y bác sĩ nước nhà.',
    isLunar: false,
    solarMonth: 2,
    solarDayStart: 27,
    solarDayEnd: 27,
    dateRangeStr: '27/02 Dương lịch',
  },
  {
    code: 'QUOC_TE_PHU_NU',
    title: 'Ngày Quốc tế Phụ nữ (8/3)',
    category: 'NATIONAL_HOLIDAY',
    description: 'Ngày Quốc tế Phụ nữ - Tôn vinh công lao và vẻ đẹp của người phụ nữ.',
    isLunar: false,
    solarMonth: 3,
    solarDayStart: 8,
    solarDayEnd: 8,
    dateRangeStr: '08/03 Dương lịch',
  },
  {
    code: 'GIO_TO_HUNG_VUONG',
    title: 'Đại lễ Giỗ Tổ Hùng Vương',
    category: 'NATIONAL_HOLIDAY',
    description: 'Ngày Giỗ Tổ Hùng Vương (10/3 ÂL) - Tưởng nhớ công lao dựng nước của các Vua Hùng.',
    isLunar: true,
    lunarMonth: 3,
    lunarDayStart: 10,
    lunarDayEnd: 10,
    dateRangeStr: '10/03 Âm lịch',
  },
  {
    code: 'GIAI_PHONG_MIEN_NAM',
    title: 'Ngày Giải phóng miền Nam, Thống nhất đất nước',
    category: 'NATIONAL_HOLIDAY',
    description: 'Kỷ niệm Ngày Giải phóng hoàn toàn miền Nam, thống nhất non sông (30/4/1975).',
    isLunar: false,
    solarMonth: 4,
    solarDayStart: 30,
    solarDayEnd: 30,
    dateRangeStr: '30/04 Dương lịch',
  },
  {
    code: 'QUOC_TE_LAO_DONG',
    title: 'Ngày Quốc tế Lao động',
    category: 'NATIONAL_HOLIDAY',
    description: 'Ngày Quốc tế Lao động (1/5) - Tôn vinh lực lượng lao động toàn xã hội.',
    isLunar: false,
    solarMonth: 5,
    solarDayStart: 1,
    solarDayEnd: 1,
    dateRangeStr: '01/05 Dương lịch',
  },
  {
    code: 'TET_DOAN_NGO',
    title: 'Tết Đoan Ngọ (Giết sâu bọ)',
    category: 'NATIONAL_HOLIDAY',
    description: 'Tết Đoan Ngọ mùng 5 tháng 5 Âm lịch - Phong tục trừ sâu bọ, cầu bình an mùa màng.',
    isLunar: true,
    lunarMonth: 5,
    lunarDayStart: 5,
    lunarDayEnd: 5,
    dateRangeStr: '05/05 Âm lịch',
  },
  {
    code: 'THUONG_BINH_LIET_SI',
    title: 'Ngày Thương binh - Liệt sĩ',
    category: 'NATIONAL_HOLIDAY',
    description: 'Ngày tri ân các anh hùng liệt sĩ, thương bệnh binh đã hy sinh vì nền độc lập tự do (27/7).',
    isLunar: false,
    solarMonth: 7,
    solarDayStart: 27,
    solarDayEnd: 27,
    dateRangeStr: '27/07 Dương lịch',
  },
  {
    code: 'CACH_MANG_THANG_TAM',
    title: 'Ngày Cách mạng Tháng Tám thành công',
    category: 'NATIONAL_HOLIDAY',
    description: 'Kỷ niệm ngày thắng lợi của Cách mạng Tháng Tám hào hùng (19/08/1945).',
    isLunar: false,
    solarMonth: 8,
    solarDayStart: 19,
    solarDayEnd: 19,
    dateRangeStr: '19/08 Dương lịch',
  },
  {
    code: 'QUOC_KHANH_VIET_NAM',
    title: 'Đại lễ Quốc khánh nước CHXHCN Việt Nam',
    category: 'NATIONAL_HOLIDAY',
    description: 'Kỷ niệm Ngày Bác Hồ đọc Tuyên ngôn Độc lập khai sinh nước VNDCCH (02/09/1945).',
    isLunar: false,
    solarMonth: 9,
    solarDayStart: 2,
    solarDayEnd: 2,
    dateRangeStr: '02/09 Dương lịch',
  },
  {
    code: 'GIAI_PHONG_THU_DO',
    title: 'Ngày Giải phóng Thủ đô',
    category: 'NATIONAL_HOLIDAY',
    description: 'Kỷ niệm ngày đoàn quân giải phóng tiến về tiếp quản Thủ đô Hà Nội (10/10/1954).',
    isLunar: false,
    solarMonth: 10,
    solarDayStart: 10,
    solarDayEnd: 10,
    dateRangeStr: '10/10 Dương lịch',
  },
  {
    code: 'PHU_NU_VIET_NAM',
    title: 'Ngày Phụ nữ Việt Nam (20/10)',
    category: 'NATIONAL_HOLIDAY',
    description: 'Kỷ niệm Ngày thành lập Hội Liên hiệp Phụ nữ Việt Nam (20/10/1930).',
    isLunar: false,
    solarMonth: 10,
    solarDayStart: 20,
    solarDayEnd: 20,
    dateRangeStr: '20/10 Dương lịch',
  },
  {
    code: 'NHA_GIAO_VIET_NAM',
    title: 'Ngày Nhà giáo Việt Nam (20/11)',
    category: 'NATIONAL_HOLIDAY',
    description: 'Ngày Hiến chương Nhà giáo Việt Nam - Tôn vinh truyền thống Tôn sư trọng đạo.',
    isLunar: false,
    solarMonth: 11,
    solarDayStart: 20,
    solarDayEnd: 20,
    dateRangeStr: '20/11 Dương lịch',
  },
  {
    code: 'QUAN_DOI_NHAN_DAN',
    title: 'Ngày Thành lập Quân đội Nhân dân Việt Nam',
    category: 'NATIONAL_HOLIDAY',
    description: 'Ngày hội Quốc phòng toàn dân và thành lập QĐND Việt Nam anh hùng (22/12/1944).',
    isLunar: false,
    solarMonth: 12,
    solarDayStart: 22,
    solarDayEnd: 22,
    dateRangeStr: '22/12 Dương lịch',
  },
  {
    code: 'TET_ONG_TAO',
    title: 'Tết Táo Quân (Đưa Ông Táo về trời)',
    category: 'NATIONAL_HOLIDAY',
    description: 'Lễ cúng tiễn Táo Quân cưỡi cá chép chầu trời báo cáo việc trần gian (23 tháng Chạp).',
    isLunar: true,
    lunarMonth: 12,
    lunarDayStart: 23,
    lunarDayEnd: 23,
    dateRangeStr: '23/12 Âm lịch',
  },
];

// Toàn bộ các ngày lễ (gồm cả Tôn giáo và Quốc gia)
export const ALL_CALENDAR_EVENTS: ReligiousEventItem[] = [
  ...VERIFIED_RELIGIOUS_EVENTS,
  ...VERIFIED_NATIONAL_EVENTS,
];

/**
 * Tìm tất cả các sự kiện diễn ra trong ngày
 */
export function getEventsForDay(
  solarMonth: number,
  solarDay: number,
  lunarMonth: number,
  lunarDay: number,
): ReligiousEventItem[] {
  return ALL_CALENDAR_EVENTS.filter((event) => {
    if (event.isLunar) {
      if (event.lunarMonth !== lunarMonth) return false;
      const start = event.lunarDayStart ?? 1;
      const end = event.lunarDayEnd ?? start;
      return lunarDay >= start && lunarDay <= end;
    } else {
      if (event.solarMonth !== solarMonth) return false;
      const start = event.solarDayStart ?? 1;
      const end = event.solarDayEnd ?? start;
      return solarDay >= start && solarDay <= end;
    }
  });
}

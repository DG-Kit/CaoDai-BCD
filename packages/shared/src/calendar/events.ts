/**
 * @file events.ts - 13 Ngày Đại Lễ & Kỷ Niệm Chính Thức Hội Thánh Cao Đài Ban Chỉnh Đạo
 * @description Đã được đối chiếu và thẩm định theo tư liệu chính thức của Hội Thánh.
 */

export interface ReligiousEventItem {
  code: string;
  title: string;
  category: 'MAJOR_HOLIDAY' | 'COMMEMORATION';
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

/**
 * Tìm các sự kiện tôn giáo diễn ra trong ngày
 */
export function getEventsForDay(
  solarMonth: number,
  solarDay: number,
  lunarMonth: number,
  lunarDay: number,
): ReligiousEventItem[] {
  return VERIFIED_RELIGIOUS_EVENTS.filter((event) => {
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

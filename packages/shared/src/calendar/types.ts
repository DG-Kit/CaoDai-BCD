export interface LunarDate {
  day: number;
  month: number;
  year: number;
  leap: boolean;
  jd: number;
  totalDaysInMonth: number;
}

export interface CanChi {
  day: string;
  month: string;
  year: string;
}

export interface HoangDaoHour {
  chi: string;
  name: string;
  starName: string;
  timeRange: string;
  isHoangDao: boolean;
}

export interface DayCalendarInfo {
  solarDate: string; // YYYY-MM-DD
  solarDay: number;
  solarMonth: number;
  solarYear: number;
  dayOfWeek: number; // 0: Chủ Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy
  dayOfWeekName: string; // "Chủ Nhật", "Thứ Hai", ...
  lunar: LunarDate;
  isSocVong: boolean; // true nếu là Mùng 1 (Sóc) hoặc 15 (Vọng)
  canChi: CanChi;
  hoangDaoHours: string[]; // Backward-compatible danh sách 6 chi giờ Hoàng đạo: ["Sửu (01h-03h)", ...]
  allHours: HoangDaoHour[]; // Trọn vẹn 12 giờ trong ngày (Hoàng Đạo & Hắc Đạo)
  isFastingDay: boolean; // Theo chế độ ăn chay được truyền vào
  fastingNote?: string;
}

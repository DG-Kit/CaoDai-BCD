import { HoangDaoHour } from './types';

export const CHI_HOURS: Record<string, string> = {
  Tý: '23h-01h',
  Sửu: '01h-03h',
  Dần: '03h-05h',
  Mão: '05h-07h',
  Thìn: '07h-09h',
  Tỵ: '09h-11h',
  Ngọ: '11h-13h',
  Mùi: '13h-15h',
  Thân: '15h-17h',
  Dậu: '17h-19h',
  Tuất: '19h-21h',
  Hợi: '21h-23h',
};

export const ORDERED_CHIS = [
  'Tý',
  'Sửu',
  'Dần',
  'Mão',
  'Thìn',
  'Tỵ',
  'Ngọ',
  'Mùi',
  'Thân',
  'Dậu',
  'Tuất',
  'Hợi',
];

// Thứ tự 12 sao Thập Nhị Thần Sát (Hoàng Đạo: 1, 2, 5, 6, 8, 11; Hắc Đạo: 3, 4, 7, 9, 10, 12)
const TWELVE_STARS = [
  { name: 'Thanh Long', isHoangDao: true },
  { name: 'Minh Đường', isHoangDao: true },
  { name: 'Thiên Hình', isHoangDao: false },
  { name: 'Chu Tước', isHoangDao: false },
  { name: 'Kim Quỹ', isHoangDao: true },
  { name: 'Thiên Đức', isHoangDao: true },
  { name: 'Bạch Hổ', isHoangDao: false },
  { name: 'Ngọc Đường', isHoangDao: true },
  { name: 'Thiên Lao', isHoangDao: false },
  { name: 'Huyền Vũ', isHoangDao: false },
  { name: 'Tư Mệnh', isHoangDao: true },
  { name: 'Câu Trận', isHoangDao: false },
];

// Chi giờ bắt đầu sao Thanh Long theo Địa Chi của ngày
const THANH_LONG_START_CHI: Record<string, string> = {
  Dần: 'Tý',
  Thân: 'Tý',
  Mão: 'Dần',
  Dậu: 'Dần',
  Thìn: 'Thìn',
  Tuất: 'Thìn',
  Tỵ: 'Ngọ',
  Hợi: 'Ngọ',
  Tý: 'Thân',
  Ngọ: 'Thân',
  Sửu: 'Tuất',
  Mùi: 'Tuất',
};

/**
 * Trả về chi tiết 12 giờ trong ngày kèm sao chi phối và trạng thái Hoàng đạo hay Hắc đạo
 */
export function getFullDayHoursInfo(dayChi: string): HoangDaoHour[] {
  const startChi = THANH_LONG_START_CHI[dayChi] || 'Tý';
  const startIdx = ORDERED_CHIS.indexOf(startChi);

  return ORDERED_CHIS.map((chi, idx) => {
    // Khoảng cách từ startChi đến chi này
    const offset = (idx - startIdx + 12) % 12;
    const star = TWELVE_STARS[offset] || { name: 'Thanh Long', isHoangDao: true };

    return {
      chi,
      name: `Giờ ${chi}`,
      starName: star.name,
      timeRange: CHI_HOURS[chi] || '',
      isHoangDao: star.isHoangDao,
    };
  });
}

/**
 * Lấy danh sách 6 giờ Hoàng Đạo trong ngày kèm khung giờ hiển thị
 */
export function getHoangDaoHours(dayChi: string): string[] {
  const allHours = getFullDayHoursInfo(dayChi);
  return allHours
    .filter((h) => h.isHoangDao)
    .map((h) => `${h.chi} (${h.timeRange} - ${h.starName})`);
}

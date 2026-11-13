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

// 6 Giờ Hoàng Đạo ứng với từng cặp Địa Chi của ngày
const HOANG_DAO_BY_DAY_CHI: Record<string, string[]> = {
  Tý: ['Tý', 'Sửu', 'Mão', 'Ngọ', 'Thân', 'Dậu'],
  Ngọ: ['Tý', 'Sửu', 'Mão', 'Ngọ', 'Thân', 'Dậu'],
  Sửu: ['Dần', 'Mão', 'Tỵ', 'Thân', 'Tuất', 'Hợi'],
  Mùi: ['Dần', 'Mão', 'Tỵ', 'Thân', 'Tuất', 'Hợi'],
  Dần: ['Tý', 'Sửu', 'Thìn', 'Tỵ', 'Mùi', 'Tuất'],
  Thân: ['Tý', 'Sửu', 'Thìn', 'Tỵ', 'Mùi', 'Tuất'],
  Mão: ['Tý', 'Dần', 'Mão', 'Ngọ', 'Mùi', 'Dậu'],
  Dậu: ['Tý', 'Dần', 'Mão', 'Ngọ', 'Mùi', 'Dậu'],
  Thìn: ['Dần', 'Thìn', 'Tỵ', 'Thân', 'Dậu', 'Hợi'],
  Tuất: ['Dần', 'Thìn', 'Tỵ', 'Thân', 'Dậu', 'Hợi'],
  Tỵ: ['Sửu', 'Thìn', 'Ngọ', 'Mùi', 'Tuất', 'Hợi'],
  Hợi: ['Sửu', 'Thìn', 'Ngọ', 'Mùi', 'Tuất', 'Hợi'],
};

/**
 * Lấy danh sách 6 giờ Hoàng Đạo trong ngày kèm khung giờ hiển thị
 * @param dayChi Địa chi của ngày (ví dụ: 'Hợi', 'Tý', 'Sửu'...)
 */
export function getHoangDaoHours(dayChi: string): string[] {
  const chis = HOANG_DAO_BY_DAY_CHI[dayChi] || ['Tý', 'Sửu', 'Mão', 'Ngọ', 'Thân', 'Dậu'];
  return chis.map((chi) => `${chi} (${CHI_HOURS[chi] || ''})`);
}

/**
 * Trả về chi tiết 12 giờ trong ngày kèm trạng thái Hoàng đạo hay Hắc đạo
 */
export function getFullDayHoursInfo(dayChi: string): HoangDaoHour[] {
  const hoangDaoChis = new Set(HOANG_DAO_BY_DAY_CHI[dayChi] || []);
  const allChis = Object.keys(CHI_HOURS);

  return allChis.map((chi) => ({
    chi,
    name: `Giờ ${chi}`,
    timeRange: CHI_HOURS[chi] || '',
    isHoangDao: hoangDaoChis.has(chi),
  }));
}

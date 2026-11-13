import { FastingSchedule } from '../index';
import { convertSolar2Lunar, jdn } from './lunar';
import { getFullCanChi } from './canchi';
import { getHoangDaoHours } from './hoangdao';
import { checkFastingDay } from './fasting';
import { DayCalendarInfo, LunarDate, CanChi } from './types';

export * from './types';
export * from './lunar';
export * from './canchi';
export * from './hoangdao';
export * from './fasting';
export * from './events';

const DAY_OF_WEEK_NAMES = [
  'Chủ Nhật',
  'Thứ Hai',
  'Thứ Ba',
  'Thứ Tư',
  'Thứ Năm',
  'Thứ Sáu',
  'Thứ Bảy',
];

/**
 * Lấy đầy đủ thông tin Lịch Đạo của một ngày Dương lịch cụ thể
 */
export function getDayCalendarInfo(
  solarYear: number,
  solarMonth: number,
  solarDay: number,
  fastingSchedule: FastingSchedule = FastingSchedule.NONE,
): DayCalendarInfo {
  const lunar: LunarDate = convertSolar2Lunar(solarDay, solarMonth, solarYear);
  const canChi: CanChi = getFullCanChi(lunar.jd, lunar.month, lunar.year);

  // Lấy chi của ngày từ Can Chi ngày (ví dụ: 'Tân Hợi' -> chi là 'Hợi')
  const dayChi = canChi.day.split(' ')[1] || 'Tý';
  const hoangDaoHours = getHoangDaoHours(dayChi);

  // Tính ngày trong tuần (0: Chủ Nhật, ..., 6: Thứ Bảy)
  const jd = jdn(solarDay, solarMonth, solarYear);
  const dayOfWeek = (jd + 1) % 7;
  const dayOfWeekName = DAY_OF_WEEK_NAMES[dayOfWeek] || 'Chủ Nhật';

  // Kiểm tra ngày Sóc / Vọng
  const isSocVong = lunar.day === 1 || lunar.day === 15;

  // Kiểm tra ngày ăn chay
  const fastingResult = checkFastingDay(
    lunar.day,
    lunar.totalDaysInMonth,
    fastingSchedule,
    lunar.month,
  );

  const solarMonthStr = solarMonth < 10 ? `0${solarMonth}` : `${solarMonth}`;
  const solarDayStr = solarDay < 10 ? `0${solarDay}` : `${solarDay}`;
  const solarDate = `${solarYear}-${solarMonthStr}-${solarDayStr}`;

  return {
    solarDate,
    solarDay,
    solarMonth,
    solarYear,
    dayOfWeek,
    dayOfWeekName,
    lunar,
    isSocVong,
    canChi,
    hoangDaoHours,
    isFastingDay: fastingResult.isFasting,
    fastingNote: fastingResult.note,
  };
}

/**
 * Lấy thông tin Lịch Đạo của toàn bộ các ngày trong một tháng Dương lịch
 */
export function getMonthCalendarInfo(
  year: number,
  month: number,
  fastingSchedule: FastingSchedule = FastingSchedule.NONE,
): DayCalendarInfo[] {
  // Số ngày trong tháng Dương lịch
  const daysInMonth = new Date(year, month, 0).getDate();
  const result: DayCalendarInfo[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    result.push(getDayCalendarInfo(year, month, day, fastingSchedule));
  }

  return result;
}

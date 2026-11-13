import { CanChi } from './types';

export const THIEN_CAN = [
  'Giáp',
  'Ất',
  'Bính',
  'Đinh',
  'Mậu',
  'Kỷ',
  'Canh',
  'Tân',
  'Nhâm',
  'Quý',
] as const;

export const DIA_CHI = [
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
] as const;

/**
 * Tính Can Chi của Năm (dựa vào năm Âm lịch)
 */
export function getCanChiYear(lunarYear: number): string {
  const can = THIEN_CAN[(lunarYear + 6) % 10];
  const chi = DIA_CHI[(lunarYear + 8) % 12];
  return `${can} ${chi}`;
}

/**
 * Tính Can Chi của Ngày (dựa vào số ngày Julius JDN)
 */
export function getCanChiDay(jd: number): string {
  const can = THIEN_CAN[(jd + 9) % 10];
  const chi = DIA_CHI[(jd + 1) % 12];
  return `${can} ${chi}`;
}

/**
 * Tính Can Chi của Tháng Âm lịch (dựa vào Can của Năm và tháng Âm lịch theo Ngũ Hổ Độn)
 */
export function getCanChiMonth(lunarMonth: number, lunarYear: number): string {
  // Chi của tháng: Tháng 1 âm là Dần (index 2), Tháng 2 là Mão (3), ..., Tháng 11 là Tý (0), Tháng 12 là Sửu (1)
  const chiIndex = (lunarMonth + 1) % 12;
  const chi = DIA_CHI[chiIndex];

  // Can của năm
  const yearCanIndex = (lunarYear + 6) % 10;
  // Ngũ Hổ Độn:
  // Năm Giáp(0)/Kỷ(5) -> Tháng 1 bắt đầu Bính(2)
  // Năm Ất(1)/Canh(6) -> Tháng 1 bắt đầu Mậu(4)
  // Năm Bính(2)/Tân(7) -> Tháng 1 bắt đầu Canh(6)
  // Năm Đinh(3)/Nhâm(8) -> Tháng 1 bắt đầu Nhâm(8)
  // Năm Mậu(4)/Quý(9) -> Tháng 1 bắt đầu Giáp(0)
  const month1CanIndex = (yearCanIndex * 2 + 2) % 10;
  const canIndex = (month1CanIndex + (lunarMonth - 1)) % 10;
  const can = THIEN_CAN[canIndex];

  return `${can} ${chi}`;
}

/**
 * Tính toán toàn bộ Can Chi (Ngày, Tháng, Năm)
 */
export function getFullCanChi(jd: number, lunarMonth: number, lunarYear: number): CanChi {
  return {
    day: getCanChiDay(jd),
    month: getCanChiMonth(lunarMonth, lunarYear),
    year: getCanChiYear(lunarYear),
  };
}


import { FastingSchedule } from '../index';

export interface FastingCheckResult {
  isFasting: boolean;
  schedule: FastingSchedule;
  note?: string;
}

/**
 * Kiểm tra xem ngày âm lịch cụ thể có phải là ngày ăn chay (trai kỳ) hay không
 * @param lunarDay Ngày âm lịch (1-30)
 * @param totalDaysInMonth Tổng số ngày của tháng âm lịch này (29 = thiếu, 30 = đủ)
 * @param schedule Chế độ ăn chay lựa chọn
 * @param lunarMonth Tháng âm lịch (1-12)
 */
export function checkFastingDay(
  lunarDay: number,
  totalDaysInMonth: number,
  schedule: FastingSchedule,
  lunarMonth?: number,
): FastingCheckResult {
  if (schedule === FastingSchedule.NONE) {
    return { isFasting: false, schedule };
  }

  // 1. CHẾ ĐỘ THIÊN NGƯƠN (Ăn chay trọn tháng Tam Ngươn: Tháng Giêng, Tháng Bảy, Tháng Mười)
  if (schedule === FastingSchedule.THIEN_NGUON) {
    if (lunarMonth === 1 || lunarMonth === 7 || lunarMonth === 10) {
      const monthNames: Record<number, string> = {
        1: 'Thượng Ngươn (Tháng Giêng)',
        7: 'Trung Ngươn (Tháng Bảy)',
        10: 'Hạ Ngươn (Tháng Mười)',
      };
      return {
        isFasting: true,
        schedule,
        note: `Ăn chay kỳ ${monthNames[lunarMonth]}`,
      };
    }
    // Các tháng khác trong kỳ Thiên Ngươn: người ăn thường giữ Thập trai
    return checkFastingDay(lunarDay, totalDaysInMonth, FastingSchedule.THAP_TRAI, lunarMonth);
  }

  // 2. CHẾ ĐỘ LỤC TRAI (6 ngày trong tháng)
  if (schedule === FastingSchedule.LUC_TRAI) {
    // 4 ngày cố định: mùng 8, 14, 15, 23
    if (lunarDay === 8 || lunarDay === 14 || lunarDay === 15 || lunarDay === 23) {
      return { isFasting: true, schedule, note: 'Lục trai' };
    }

    // 2 ngày cuối tháng:
    // Tháng đủ (30 ngày) -> ăn ngày 29, 30
    // Tháng thiếu (29 ngày) -> ăn ngày 28, 29 (tính bù)
    if (totalDaysInMonth >= 30) {
      if (lunarDay === 29 || lunarDay === 30) {
        return { isFasting: true, schedule, note: 'Lục trai' };
      }
    } else {
      if (lunarDay === 28 || lunarDay === 29) {
        return {
          isFasting: true,
          schedule,
          note: lunarDay === 28 ? 'Lục trai (bù tháng thiếu)' : 'Lục trai',
        };
      }
    }

    return { isFasting: false, schedule };
  }

  // 3. CHẾ ĐỘ THẬP TRAI (10 ngày trong tháng)
  if (schedule === FastingSchedule.THAP_TRAI) {
    // 7 ngày cố định: mùng 1, 8, 14, 15, 18, 23, 24
    if (
      lunarDay === 1 ||
      lunarDay === 8 ||
      lunarDay === 14 ||
      lunarDay === 15 ||
      lunarDay === 18 ||
      lunarDay === 23 ||
      lunarDay === 24
    ) {
      return { isFasting: true, schedule, note: 'Thập trai' };
    }

    // 3 ngày cuối tháng:
    // Tháng đủ (30 ngày) -> ăn ngày 28, 29, 30
    // Tháng thiếu (29 ngày) -> ăn ngày 27, 28, 29 (tính bù)
    if (totalDaysInMonth >= 30) {
      if (lunarDay === 28 || lunarDay === 29 || lunarDay === 30) {
        return { isFasting: true, schedule, note: 'Thập trai' };
      }
    } else {
      if (lunarDay === 27 || lunarDay === 28 || lunarDay === 29) {
        return {
          isFasting: true,
          schedule,
          note: lunarDay === 27 ? 'Thập trai (bù tháng thiếu)' : 'Thập trai',
        };
      }
    }

    return { isFasting: false, schedule };
  }

  return { isFasting: false, schedule };
}


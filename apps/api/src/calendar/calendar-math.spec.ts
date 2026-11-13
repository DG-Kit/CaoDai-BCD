import {
  convertSolar2Lunar,
  getCanChiYear,
  getCanChiDay,
  getCanChiMonth,
  getHoangDaoHours,
  checkFastingDay,
  getDayCalendarInfo,
  getMonthCalendarInfo,
  FastingSchedule,
} from '@caodai-bcd/shared';

describe('Calendar Math & Fasting Algorithm Tests (Task 1.1)', () => {
  describe('1. Solar to Lunar Conversion', () => {
    it('should correctly convert 10/02/2024 to Lunar New Year Giap Thin (01/01/2024)', () => {
      const lunar = convertSolar2Lunar(10, 2, 2024);
      expect(lunar.day).toBe(1);
      expect(lunar.month).toBe(1);
      expect(lunar.year).toBe(2024);
      expect(lunar.leap).toBe(false);
    });

    it('should correctly convert 17/02/2026 to Lunar New Year Binh Ngo (01/01/2026)', () => {
      const lunar = convertSolar2Lunar(17, 2, 2026);
      expect(lunar.day).toBe(1);
      expect(lunar.month).toBe(1);
      expect(lunar.year).toBe(2026);
    });

    it('should correctly identify Mid-Autumn Festival (15/08 lunar)', () => {
      // 17/09/2024 is 15/08/2024 lunar
      const lunar = convertSolar2Lunar(17, 9, 2024);
      expect(lunar.day).toBe(15);
      expect(lunar.month).toBe(8);
      expect(lunar.year).toBe(2024);
    });
  });

  describe('2. Can Chi Calculation', () => {
    it('should calculate correct Can Chi for Year 2024 (Giap Thin) and 2026 (Binh Ngo)', () => {
      expect(getCanChiYear(2024)).toBe('Giáp Thìn');
      expect(getCanChiYear(2025)).toBe('Ất Tỵ');
      expect(getCanChiYear(2026)).toBe('Bính Ngọ');
    });

    it('should calculate correct Can Chi for Month', () => {
      // In Binh Ngo year (2026), month 1 is Canh Dan
      expect(getCanChiMonth(1, 2026)).toBe('Canh Dần');
      expect(getCanChiMonth(10, 2026)).toBe('Kỷ Hợi');
    });

    it('should calculate correct Can Chi for Day', () => {
      // 13/11/2026 is Tan Mao, Ky Hoi month, Binh Ngo year
      const dayInfo = getDayCalendarInfo(2026, 11, 13);
      expect(dayInfo.canChi.day).toBe('Tân Mão');
      expect(dayInfo.canChi.month).toBe('Kỷ Hợi');
      expect(dayInfo.canChi.year).toBe('Bính Ngọ');
    });
  });

  describe('3. Hoang Dao Hours', () => {
    it('should return 6 Hoang Dao hours for Hoi day', () => {
      const hours = getHoangDaoHours('Hợi');
      expect(hours).toHaveLength(6);
      // Sửu, Thìn, Ngọ, Mùi, Tuất, Hợi
      expect(hours.some((h) => h.startsWith('Sửu'))).toBe(true);
      expect(hours.some((h) => h.startsWith('Ngọ'))).toBe(true);
      expect(hours.some((h) => h.startsWith('Hợi'))).toBe(true);
    });

    it('should return 6 Hoang Dao hours for Ty day', () => {
      const hours = getHoangDaoHours('Tý');
      expect(hours).toHaveLength(6);
      // Tý, Sửu, Mão, Ngọ, Thân, Dậu
      expect(hours.some((h) => h.startsWith('Tý'))).toBe(true);
      expect(hours.some((h) => h.startsWith('Mão'))).toBe(true);
    });
  });

  describe('4. Fasting Rules (Luc Trai, Thap Trai, Thien Nguon)', () => {
    it('should correctly flag fixed days for Luc Trai (8, 14, 15, 23)', () => {
      expect(checkFastingDay(8, 30, FastingSchedule.LUC_TRAI).isFasting).toBe(true);
      expect(checkFastingDay(14, 30, FastingSchedule.LUC_TRAI).isFasting).toBe(true);
      expect(checkFastingDay(15, 30, FastingSchedule.LUC_TRAI).isFasting).toBe(true);
      expect(checkFastingDay(23, 30, FastingSchedule.LUC_TRAI).isFasting).toBe(true);
      expect(checkFastingDay(1, 30, FastingSchedule.LUC_TRAI).isFasting).toBe(false);
    });

    it('should handle end-of-month for Luc Trai: 29, 30 in full month (30 days)', () => {
      expect(checkFastingDay(29, 30, FastingSchedule.LUC_TRAI).isFasting).toBe(true);
      expect(checkFastingDay(30, 30, FastingSchedule.LUC_TRAI).isFasting).toBe(true);
      expect(checkFastingDay(28, 30, FastingSchedule.LUC_TRAI).isFasting).toBe(false);
    });

    it('should automatically compensate for Luc Trai: 28, 29 in short month (29 days)', () => {
      expect(checkFastingDay(28, 29, FastingSchedule.LUC_TRAI).isFasting).toBe(true);
      expect(checkFastingDay(29, 29, FastingSchedule.LUC_TRAI).isFasting).toBe(true);
      expect(checkFastingDay(28, 29, FastingSchedule.LUC_TRAI).note).toContain('bù tháng thiếu');
    });

    it('should correctly flag Thap Trai fixed days (1, 8, 14, 15, 18, 23, 24)', () => {
      expect(checkFastingDay(1, 30, FastingSchedule.THAP_TRAI).isFasting).toBe(true);
      expect(checkFastingDay(18, 30, FastingSchedule.THAP_TRAI).isFasting).toBe(true);
      expect(checkFastingDay(24, 30, FastingSchedule.THAP_TRAI).isFasting).toBe(true);
      expect(checkFastingDay(2, 30, FastingSchedule.THAP_TRAI).isFasting).toBe(false);
    });

    it('should compensate for Thap Trai in short month (29 days): 27, 28, 29', () => {
      expect(checkFastingDay(27, 29, FastingSchedule.THAP_TRAI).isFasting).toBe(true);
      expect(checkFastingDay(28, 29, FastingSchedule.THAP_TRAI).isFasting).toBe(true);
      expect(checkFastingDay(29, 29, FastingSchedule.THAP_TRAI).isFasting).toBe(true);
      expect(checkFastingDay(27, 29, FastingSchedule.THAP_TRAI).note).toContain('bù tháng thiếu');
    });

    it('should flag every day as fasting in Thien Nguon months (month 1, 7, 10)', () => {
      expect(checkFastingDay(5, 30, FastingSchedule.THIEN_NGUON, 10).isFasting).toBe(true);
      expect(checkFastingDay(12, 30, FastingSchedule.THIEN_NGUON, 1).isFasting).toBe(true);
      expect(checkFastingDay(20, 30, FastingSchedule.THIEN_NGUON, 7).isFasting).toBe(true);
      expect(checkFastingDay(5, 30, FastingSchedule.THIEN_NGUON, 10).note).toContain('Hạ Ngươn');
    });
  });

  describe('5. getMonthCalendarInfo Integration', () => {
    it('should generate all days of November 2026 (30 days) with full info', () => {
      const monthDays = getMonthCalendarInfo(2026, 11, FastingSchedule.LUC_TRAI);
      expect(monthDays).toHaveLength(30);

      const day1 = monthDays[0];
      expect(day1.solarDay).toBe(1);
      expect(day1.solarMonth).toBe(11);
      expect(day1.solarYear).toBe(2026);
      expect(day1.canChi.day).toBeDefined();
      expect(day1.hoangDaoHours).toHaveLength(6);
      expect(typeof day1.isSocVong).toBe('boolean');
    });
  });
});

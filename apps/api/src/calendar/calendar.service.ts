import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  getDayCalendarInfo,
  getMonthCalendarInfo,
  FastingSchedule,
  DayCalendarInfo,
} from '@caodai-bcd/shared';

export interface CalendarDayWithEvents extends DayCalendarInfo {
  events: Array<{
    code: string;
    title: string;
    category: string;
    description: string | null;
    dateRangeStr: string | null;
  }>;
}

@Injectable()
export class CalendarService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lấy danh sách tất cả các ngày lễ/sự kiện tôn giáo kèm quy tắc lịch
   */
  async getAllReligiousEvents() {
    return this.prisma.religiousEvent.findMany({
      include: {
        rules: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  /**
   * Lấy thông tin lịch chi tiết cho một tháng Dương lịch
   */
  async getMonthCalendar(
    year?: number,
    month?: number,
    fasting: FastingSchedule = FastingSchedule.NONE,
  ) {
    const now = new Date();
    const targetYear = year ?? now.getFullYear();
    const targetMonth = month ?? now.getMonth() + 1;

    // 1. Tính toán lịch Âm - Dương, Can Chi, Trai kỳ và Giờ Hoàng Đạo
    const baseDays = getMonthCalendarInfo(targetYear, targetMonth, fasting);

    // 2. Tải danh sách sự kiện từ Database
    const allEvents = await this.getAllReligiousEvents();

    // 3. Khớp sự kiện vào từng ngày
    const days: CalendarDayWithEvents[] = baseDays.map((day) => {
      const matched = allEvents
        .filter((event) => {
          return event.rules.some((rule) => {
            if (rule.isLunar) {
              if (rule.lunarMonth !== null && rule.lunarMonth !== day.lunar.month) {
                return false;
              }
              const start = rule.lunarDayStart ?? 1;
              const end = rule.lunarDayEnd ?? start;
              return day.lunar.day >= start && day.lunar.day <= end;
            } else {
              if (rule.solarMonth !== null && rule.solarMonth !== day.solarMonth) {
                return false;
              }
              const start = rule.solarDayStart ?? 1;
              const end = rule.solarDayEnd ?? start;
              return day.solarDay >= start && day.solarDay <= end;
            }
          });
        })
        .map((event) => ({
          code: event.code,
          title: event.title,
          category: event.category,
          description: event.description,
          dateRangeStr: event.rules[0]?.dateRangeStr ?? null,
        }));

      return {
        ...day,
        events: matched,
      };
    });

    return {
      year: targetYear,
      month: targetMonth,
      totalDays: days.length,
      fastingMode: fasting,
      days,
    };
  }

  /**
   * Lấy thông tin lịch chi tiết cho một ngày Dương lịch cụ thể
   */
  async getDayCalendar(
    year: number,
    month: number,
    day: number,
    fasting: FastingSchedule = FastingSchedule.NONE,
  ): Promise<CalendarDayWithEvents> {
    const baseDay = getDayCalendarInfo(year, month, day, fasting);
    const allEvents = await this.getAllReligiousEvents();

    const matched = allEvents
      .filter((event) => {
        return event.rules.some((rule) => {
          if (rule.isLunar) {
            if (rule.lunarMonth !== null && rule.lunarMonth !== baseDay.lunar.month) {
              return false;
            }
            const start = rule.lunarDayStart ?? 1;
            const end = rule.lunarDayEnd ?? start;
            return baseDay.lunar.day >= start && baseDay.lunar.day <= end;
          } else {
            if (rule.solarMonth !== null && rule.solarMonth !== baseDay.solarMonth) {
              return false;
            }
            const start = rule.solarDayStart ?? 1;
            const end = rule.solarDayEnd ?? start;
            return baseDay.solarDay >= start && baseDay.solarDay <= end;
          }
        });
      })
      .map((event) => ({
        code: event.code,
        title: event.title,
        category: event.category,
        description: event.description,
        dateRangeStr: event.rules[0]?.dateRangeStr ?? null,
      }));

    return {
      ...baseDay,
      events: matched,
    };
  }
}


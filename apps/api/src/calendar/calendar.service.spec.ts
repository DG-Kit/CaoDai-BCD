import { Test, TestingModule } from '@nestjs/testing';
import { CalendarService } from './calendar.service';
import { PrismaService } from '../prisma/prisma.service';
import { FastingSchedule } from '@caodai-bcd/shared';

describe('CalendarService', () => {
  let service: CalendarService;
  let prisma: PrismaService;

  const mockReligiousEvents = [
    {
      id: 'event-1',
      code: 'HA_NGUON_KHAI_DAO',
      title: 'Đại lễ Hạ Nguơn - Kỷ niệm Khai đạo',
      category: 'MAJOR_HOLIDAY',
      description: 'Đại lễ Hạ Nguơn và Kỷ niệm Ngày Khai Đạo',
      isRecurring: true,
      rules: [
        {
          id: 'rule-1',
          eventId: 'event-1',
          isLunar: true,
          lunarMonth: 10,
          lunarDayStart: 14,
          lunarDayEnd: 15,
          solarMonth: null,
          solarDayStart: null,
          solarDayEnd: null,
          applyLeapMonth: false,
          dateRangeStr: '14 – 15/10 Âm lịch',
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'event-2',
      code: 'GIANG_SINH_GIA_TO',
      title: 'Đại lễ Giáng sinh Đức Gia Tô Giáo Chủ',
      category: 'MAJOR_HOLIDAY',
      description: 'Đại lễ Giáng sinh',
      isRecurring: true,
      rules: [
        {
          id: 'rule-2',
          eventId: 'event-2',
          isLunar: false,
          lunarMonth: null,
          lunarDayStart: null,
          lunarDayEnd: null,
          solarMonth: 12,
          solarDayStart: 24,
          solarDayEnd: 25,
          applyLeapMonth: false,
          dateRangeStr: '24 – 25/12 Dương lịch',
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalendarService,
        {
          provide: PrismaService,
          useValue: {
            religiousEvent: {
              findMany: jest.fn().mockResolvedValue(mockReligiousEvents),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CalendarService>(CalendarService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllReligiousEvents', () => {
    it('should return all religious events from database', async () => {
      const events = await service.getAllReligiousEvents();
      expect(events).toHaveLength(2);
      expect(events[0].code).toBe('HA_NGUON_KHAI_DAO');
    });
  });

  describe('getMonthCalendar', () => {
    it('should return 30 days for November 2026 with accurate lunar conversion', async () => {
      const result = await service.getMonthCalendar(2026, 11, FastingSchedule.LUC_TRAI);

      expect(result.year).toBe(2026);
      expect(result.month).toBe(11);
      expect(result.totalDays).toBe(30);
      expect(result.days).toHaveLength(30);

      // Ngày 13/11/2026
      const day13 = result.days.find((d) => d.solarDay === 13);
      expect(day13).toBeDefined();
      expect(day13?.canChi.day).toBe('Tân Mão');
      expect(day13?.canChi.month).toBe('Kỷ Hợi');
      expect(day13?.canChi.year).toBe('Bính Ngọ');
      expect(day13?.lunar.day).toBe(5);
      expect(day13?.lunar.month).toBe(10);
      expect(day13?.hoangDaoHours).toHaveLength(6);

      // Ngày 23/11/2026 là ngày 15/10 ÂL (Rằm tháng 10 - Hạ Nguơn Khai Đạo)
      const day23 = result.days.find((d) => d.solarDay === 23);
      expect(day23).toBeDefined();
      expect(day23?.lunar.day).toBe(15);
      expect(day23?.lunar.month).toBe(10);
      expect(day23?.isSocVong).toBe(true);
      expect(day23?.isFastingDay).toBe(true); // Lục trai gồm ngày 15
      expect(day23?.events).toHaveLength(1);
      expect(day23?.events[0].code).toBe('HA_NGUON_KHAI_DAO');
    });

    it('should match solar holiday correctly (Giáng Sinh 24-25/12)', async () => {
      const result = await service.getMonthCalendar(2026, 12, FastingSchedule.NONE);
      const day24 = result.days.find((d) => d.solarDay === 24);
      const day25 = result.days.find((d) => d.solarDay === 25);

      expect(day24?.events.some((e) => e.code === 'GIANG_SINH_GIA_TO')).toBe(true);
      expect(day25?.events.some((e) => e.code === 'GIANG_SINH_GIA_TO')).toBe(true);
    });
  });

  describe('getDayCalendar', () => {
    it('should return detailed calendar info for a specific day', async () => {
      const dayInfo = await service.getDayCalendar(2026, 11, 13, FastingSchedule.NONE);

      expect(dayInfo.solarDate).toBe('2026-11-13');
      expect(dayInfo.solarDay).toBe(13);
      expect(dayInfo.dayOfWeekName).toBe('Thứ Sáu');
      expect(dayInfo.canChi.day).toBe('Tân Mão');
      expect(dayInfo.hoangDaoHours).toHaveLength(6);
    });
  });
});

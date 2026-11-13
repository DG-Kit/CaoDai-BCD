import { Test, TestingModule } from '@nestjs/testing';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { FastingSchedule } from '@caodai-bcd/shared';

describe('CalendarController', () => {
  let controller: CalendarController;
  let service: CalendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendarController],
      providers: [
        {
          provide: CalendarService,
          useValue: {
            getMonthCalendar: jest.fn().mockResolvedValue({
              year: 2026,
              month: 11,
              totalDays: 30,
              days: [],
            }),
            getDayCalendar: jest.fn().mockResolvedValue({
              solarDate: '2026-11-13',
              solarDay: 13,
            }),
            getAllReligiousEvents: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<CalendarController>(CalendarController);
    service = module.get<CalendarService>(CalendarService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getMonthCalendar should call calendarService.getMonthCalendar', async () => {
    const res = await controller.getMonthCalendar({
      year: 2026,
      month: 11,
      fasting: FastingSchedule.LUC_TRAI,
    });
    expect(service.getMonthCalendar).toHaveBeenCalledWith(2026, 11, FastingSchedule.LUC_TRAI);
    expect(res.totalDays).toBe(30);
  });

  it('getDayCalendar should call calendarService.getDayCalendar', async () => {
    const res = await controller.getDayCalendar({
      year: 2026,
      month: 11,
      day: 13,
    });
    expect(service.getDayCalendar).toHaveBeenCalledWith(2026, 11, 13, FastingSchedule.NONE);
    expect(res.solarDate).toBe('2026-11-13');
  });

  it('getReligiousEvents should call calendarService.getAllReligiousEvents', async () => {
    await controller.getReligiousEvents();
    expect(service.getAllReligiousEvents).toHaveBeenCalled();
  });
});

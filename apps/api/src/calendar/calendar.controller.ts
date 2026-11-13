import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastingSchedule } from '@caodai-bcd/shared';
import { CalendarService } from './calendar.service';
import { GetMonthCalendarDto } from './dto/get-month-calendar.dto';
import { GetDayCalendarDto } from './dto/get-day-calendar.dto';

@ApiTags('Lịch Đạo (Religious Calendar)')
@Controller('calendar')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('month')
  @ApiOperation({
    summary: 'Tra cứu thông tin Lịch Đạo theo tháng',
    description:
      'Trả về đầy đủ thông tin Âm - Dương, Can Chi, Trai kỳ (ăn chay), Giờ Hoàng Đạo và các ngày Đại Lễ trong tháng.',
  })
  @ApiResponse({ status: 200, description: 'Dữ liệu lịch tháng đầy đủ' })
  async getMonthCalendar(@Query() query: GetMonthCalendarDto) {
    return this.calendarService.getMonthCalendar(
      query.year,
      query.month,
      query.fasting || FastingSchedule.NONE,
    );
  }

  @Get('day')
  @ApiOperation({
    summary: 'Tra cứu thông tin chi tiết một ngày',
    description:
      'Trả về thông tin chi tiết về Âm Dương, Can Chi, 6 Giờ Hoàng Đạo, Trai kỳ và Lễ Vía của ngày được chọn.',
  })
  @ApiResponse({ status: 200, description: 'Chi tiết lịch ngày' })
  async getDayCalendar(@Query() query: GetDayCalendarDto) {
    return this.calendarService.getDayCalendar(
      query.year,
      query.month,
      query.day,
      query.fasting || FastingSchedule.NONE,
    );
  }

  @Get('events')
  @ApiOperation({
    summary: 'Danh sách các ngày Đại Lễ / Kỷ Niệm trong Đạo Cao Đài',
    description:
      'Trả về danh sách 13 ngày đại lễ và kỷ niệm chính thức của Hội Thánh Cao Đài Ban Chỉnh Đạo.',
  })
  @ApiResponse({ status: 200, description: 'Danh sách sự kiện tôn giáo' })
  async getReligiousEvents() {
    return this.calendarService.getAllReligiousEvents();
  }
}

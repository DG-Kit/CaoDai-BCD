import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FastingSchedule } from '@caodai-bcd/shared';

export class GetMonthCalendarDto {
  @ApiPropertyOptional({
    description: 'Năm Dương lịch (1900 - 2199)',
    example: 2026,
    default: 2026,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(2199)
  year?: number;

  @ApiPropertyOptional({
    description: 'Tháng Dương lịch (1 - 12)',
    example: 11,
    default: 11,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  month?: number;

  @ApiPropertyOptional({
    description: 'Chế độ ăn chay (Trai kỳ)',
    enum: FastingSchedule,
    default: FastingSchedule.NONE,
  })
  @IsOptional()
  @IsEnum(FastingSchedule)
  fasting?: FastingSchedule = FastingSchedule.NONE;
}

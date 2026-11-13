import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FastingSchedule } from '@caodai-bcd/shared';

export class GetDayCalendarDto {
  @ApiProperty({
    description: 'Năm Dương lịch',
    example: 2026,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(2199)
  year: number;

  @ApiProperty({
    description: 'Tháng Dương lịch (1 - 12)',
    example: 11,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @ApiProperty({
    description: 'Ngày Dương lịch (1 - 31)',
    example: 13,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(31)
  day: number;

  @ApiPropertyOptional({
    description: 'Chế độ ăn chay (Trai kỳ)',
    enum: FastingSchedule,
    default: FastingSchedule.NONE,
  })
  @IsOptional()
  @IsEnum(FastingSchedule)
  fasting?: FastingSchedule = FastingSchedule.NONE;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class SearchDocumentsDto {
  @ApiPropertyOptional({ description: 'Lọc theo slug danh mục' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  category?: string;

  @ApiPropertyOptional({ description: 'Từ khóa tìm kiếm (tên sách, bài kinh, nội dung kinh văn)' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  q?: string;

  @ApiPropertyOptional({ description: 'Lọc theo thẻ nghi thức (vd: Cúng Tứ Thời)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  ritual?: string;

  @ApiPropertyOptional({ description: 'Lọc theo thẻ mục đích (vd: Cầu siêu, Cầu an)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  purpose?: string;

  @ApiPropertyOptional({ description: 'Lọc theo thẻ thời điểm sử dụng' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  timing?: string;

  @ApiPropertyOptional({ description: 'Số trang (mặc định 1)', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Số kết quả mỗi trang (mặc định 12)', default: 12 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 12;
}

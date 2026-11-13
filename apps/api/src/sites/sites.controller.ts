import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SitesService } from './sites.service';

@ApiTags('Sites - Tổ Đình Bến Tre & Thánh Sở Thu Gọn')
@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Get('featured')
  @ApiOperation({
    summary: 'Lấy danh sách 4 công trình trọng tâm tại Tổ Đình Bến Tre',
    description:
      'Bao gồm Tòa Thánh Bến Tre, Điện Thờ Phật Mẫu, Nhà Tu Trung Thừa và Nhà Tu Thượng Thừa kèm nội dung Lịch sử, Xây dựng, Đường đi đến.',
  })
  getFeaturedSites() {
    return this.sitesService.getFeaturedSites();
  }

  @Get('featured/:slug')
  @ApiOperation({
    summary: 'Lấy chi tiết một công trình trọng tâm theo slug',
  })
  getFeaturedSiteBySlug(@Param('slug') slug: string) {
    return this.sitesService.getFeaturedSiteBySlug(slug);
  }

  @Get('compact')
  @ApiOperation({
    summary: 'Lấy danh mục Thánh Thất thu gọn (bảo mật thông tin)',
    description:
      'Chỉ trả về tên, loại cơ sở, tỉnh/thành và địa chỉ khái quát cho các cơ sở được phép hiển thị công khai ở mức thu gọn.',
  })
  @ApiQuery({ name: 'province', required: false, description: 'Lọc theo tỉnh/thành phố' })
  getCompactSites(@Query('province') province?: string) {
    return this.sitesService.getCompactSites(province);
  }
}


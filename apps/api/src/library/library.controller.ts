import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LibraryDomain } from '@prisma/client';
import { SearchDocumentsDto } from './dto/search-documents.dto';
import { LibraryService } from './library.service';

@ApiTags('Library - Thư Viện Đạo & Kinh Sách Ban Chỉnh Đạo')
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get('categories')
  @ApiOperation({
    summary: 'Lấy cây danh mục Thư Viện Đạo',
    description:
      'Trả về danh mục chuẩn kèm số lượng tác phẩm đã xuất bản trong từng mục. Có thể lọc theo phân khu KINH_SACH hoặc LE_NHAC_DUONG.',
  })
  @ApiQuery({ name: 'domain', required: false, enum: LibraryDomain })
  getCategories(@Query('domain') domain?: LibraryDomain) {
    return this.libraryService.getCategories(domain);
  }

  @Get('documents')
  @ApiOperation({
    summary: 'Tra cứu và lọc danh sách tác phẩm kinh sách',
    description:
      'Chỉ trả về các tác phẩm có ít nhất 1 ấn bản PUBLISHED. Hỗ trợ tìm kiếm theo tiêu đề, bài kinh, nội dung và lọc theo nghi thức/mục đích/thời điểm.',
  })
  searchDocuments(@Query() query: SearchDocumentsDto) {
    return this.libraryService.searchDocuments(query);
  }

  @Get('documents/:slug')
  @ApiOperation({
    summary: 'Chi tiết một tác phẩm và danh sách các ấn bản song song',
  })
  getDocumentBySlug(@Param('slug') slug: string) {
    return this.libraryService.getDocumentBySlug(slug);
  }

  @Get('editions/:id')
  @ApiOperation({
    summary: 'Chi tiết một ấn bản, mục lục các bài kinh và tệp scan gốc',
  })
  getEditionById(@Param('id', ParseUUIDPipe) id: string) {
    return this.libraryService.getEditionById(id);
  }

  @Get('sections/:id')
  @ApiOperation({
    summary: 'Đọc nội dung bản văn điện tử của một bài kinh kèm tham chiếu trang scan gốc',
  })
  getSectionById(@Param('id', ParseUUIDPipe) id: string) {
    return this.libraryService.getSectionById(id);
  }
}

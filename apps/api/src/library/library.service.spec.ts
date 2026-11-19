import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DocumentEditionStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LibraryService } from './library.service';

describe('LibraryService', () => {
  let service: LibraryService;

  const mockPrisma = {
    documentCategory: {
      findMany: jest.fn(),
    },
    document: {
      findMany: jest.fn(),
      count: jest.fn(),
      findFirst: jest.fn(),
    },
    documentEdition: {
      findFirst: jest.fn(),
    },
    documentSection: {
      findFirst: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibraryService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<LibraryService>(LibraryService);
    jest.clearAllMocks();
  });

  it('nên trả về danh sách danh mục kèm số lượng tác phẩm đã xuất bản', async () => {
    mockPrisma.documentCategory.findMany.mockResolvedValue([
      {
        id: 'cat-1',
        parentId: null,
        slug: 'kinh-cung-tu-thoi',
        name: 'Kinh Cúng Tứ Thời',
        description: 'Kinh Thiên Đạo',
        displayOrder: 1,
        _count: { documents: 1 },
      },
    ]);

    const result = await service.getCategories();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: 'cat-1',
      parentId: null,
      slug: 'kinh-cung-tu-thoi',
      name: 'Kinh Cúng Tứ Thời',
      description: 'Kinh Thiên Đạo',
      displayOrder: 1,
      publishedDocumentCount: 1,
    });
    expect(mockPrisma.documentCategory.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: { displayOrder: 'asc' },
      }),
    );
  });

  it('nên tìm kiếm tác phẩm chỉ ở trạng thái PUBLISHED và hỗ trợ lọc category, tags, q', async () => {
    const mockDocs = [
      {
        id: 'doc-1',
        slug: 'kinh-cung-tu-thoi-va-quan-hon-tang-te',
        title: 'Kinh Cúng Tứ Thời và Quan - Hôn - Tang - Tế',
      },
    ];
    mockPrisma.document.findMany.mockResolvedValue(mockDocs);
    mockPrisma.document.count.mockResolvedValue(1);

    const result = await service.searchDocuments({
      category: 'kinh-cung-tu-thoi',
      ritual: 'Cúng Tứ Thời',
      q: 'Niệm Hương',
      page: 1,
      limit: 12,
    });

    expect(result.items).toEqual(mockDocs);
    expect(result.total).toBe(1);
    expect(result.totalPages).toBe(1);
    expect(mockPrisma.document.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          deletedAt: null,
          editions: { some: { status: DocumentEditionStatus.PUBLISHED } },
          category: { slug: 'kinh-cung-tu-thoi' },
          ritualTags: { has: 'Cúng Tứ Thời' },
          OR: expect.any(Array),
        }),
      }),
    );
  });

  it('nên trả về chi tiết tác phẩm kèm các ấn bản PUBLISHED khi slug hợp lệ', async () => {
    const mockDoc = {
      id: 'doc-1',
      slug: 'kinh-cung-tu-thoi-va-quan-hon-tang-te',
      title: 'Kinh Cúng Tứ Thời và Quan - Hôn - Tang - Tế',
      editions: [{ id: 'ed-1', editionLabel: 'NXB Tôn Giáo 2022' }],
    };
    mockPrisma.document.findFirst.mockResolvedValue(mockDoc);

    const result = await service.getDocumentBySlug('kinh-cung-tu-thoi-va-quan-hon-tang-te');
    expect(result).toEqual(mockDoc);
  });

  it('nên ném NotFoundException khi không tìm thấy tác phẩm', async () => {
    mockPrisma.document.findFirst.mockResolvedValue(null);

    await expect(service.getDocumentBySlug('khong-ton-tai')).rejects.toThrow(NotFoundException);
  });

  it('nên trả về chi tiết ấn bản kèm mục lục và file đính kèm', async () => {
    const mockEdition = {
      id: 'ed-1',
      editionLabel: 'NXB Tôn Giáo 2022',
      sections: [{ id: 'sec-1', title: '1. Niệm Hương' }],
      files: [{ id: 'file-1', fileType: 'SCAN_ORIGINAL_PDF' }],
    };
    mockPrisma.documentEdition.findFirst.mockResolvedValue(mockEdition);

    const result = await service.getEditionById('ed-1');
    expect(result).toEqual(mockEdition);
  });

  it('nên ném NotFoundException khi không tìm thấy ấn bản', async () => {
    mockPrisma.documentEdition.findFirst.mockResolvedValue(null);

    await expect(service.getEditionById('ed-missing')).rejects.toThrow(NotFoundException);
  });

  it('nên trả về nội dung bài kinh kèm thông tin trang scan đối chiếu', async () => {
    const mockSection = {
      id: 'sec-1',
      title: '1. Niệm Hương',
      content: { contentMarkdown: 'Đạo gốc bởi lòng thành tín hiệp...' },
    };
    mockPrisma.documentSection.findFirst.mockResolvedValue(mockSection);

    const result = await service.getSectionById('sec-1');
    expect(result).toEqual(mockSection);
  });

  it('nên ném NotFoundException khi không tìm thấy bài kinh', async () => {
    mockPrisma.documentSection.findFirst.mockResolvedValue(null);

    await expect(service.getSectionById('sec-missing')).rejects.toThrow(NotFoundException);
  });
});

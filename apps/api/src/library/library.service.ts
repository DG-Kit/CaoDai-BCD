import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentEditionStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SearchDocumentsDto } from './dto/search-documents.dto';

@Injectable()
export class LibraryService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lấy cây danh mục Thư Viện Đạo kèm số lượng tác phẩm đã xuất bản (PUBLISHED).
   */
  async getCategories() {
    const categories = await this.prisma.documentCategory.findMany({
      orderBy: { displayOrder: 'asc' },
      include: {
        _count: {
          select: {
            documents: {
              where: {
                deletedAt: null,
                editions: {
                  some: { status: DocumentEditionStatus.PUBLISHED },
                },
              },
            },
          },
        },
      },
    });

    return categories.map((cat) => ({
      id: cat.id,
      parentId: cat.parentId,
      slug: cat.slug,
      name: cat.name,
      description: cat.description,
      displayOrder: cat.displayOrder,
      publishedDocumentCount: cat._count.documents,
    }));
  }

  /**
   * Tra cứu và lọc danh sách tác phẩm đã xuất bản (PUBLISHED).
   * Hỗ trợ lọc theo danh mục, thẻ nghi thức/mục đích/thời điểm và tìm kiếm toàn văn.
   */
  async searchDocuments(dto: SearchDocumentsDto) {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 12;
    const skip = (page - 1) * limit;

    const where: Prisma.DocumentWhereInput = {
      deletedAt: null,
      editions: {
        some: { status: DocumentEditionStatus.PUBLISHED },
      },
    };

    if (dto.category && dto.category.trim() !== '') {
      where.category = {
        slug: dto.category.trim(),
      };
    }

    if (dto.ritual && dto.ritual.trim() !== '') {
      where.ritualTags = { has: dto.ritual.trim() };
    }

    if (dto.purpose && dto.purpose.trim() !== '') {
      where.purposeTags = { has: dto.purpose.trim() };
    }

    if (dto.timing && dto.timing.trim() !== '') {
      where.timingTags = { has: dto.timing.trim() };
    }

    if (dto.q && dto.q.trim() !== '') {
      const keyword = dto.q.trim();
      where.OR = [
        { title: { contains: keyword, mode: 'insensitive' } },
        { summary: { contains: keyword, mode: 'insensitive' } },
        { authorOrIssuingBody: { contains: keyword, mode: 'insensitive' } },
        {
          editions: {
            some: {
              status: DocumentEditionStatus.PUBLISHED,
              sections: {
                some: {
                  OR: [
                    { title: { contains: keyword, mode: 'insensitive' } },
                    {
                      content: {
                        plainText: { contains: keyword, mode: 'insensitive' },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.document.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          category: {
            select: { id: true, slug: true, name: true },
          },
          editions: {
            where: { status: DocumentEditionStatus.PUBLISHED },
            orderBy: { publicationYear: 'desc' },
            select: {
              id: true,
              editionLabel: true,
              publicationYear: true,
              publisher: true,
              publishedAt: true,
            },
          },
        },
      }),
      this.prisma.document.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  /**
   * Chi tiết một tác phẩm theo slug, kèm danh sách các ấn bản đã xuất bản (không hợp nhất dị bản).
   */
  async getDocumentBySlug(slug: string) {
    const document = await this.prisma.document.findFirst({
      where: {
        slug,
        deletedAt: null,
        editions: {
          some: { status: DocumentEditionStatus.PUBLISHED },
        },
      },
      include: {
        category: {
          select: { id: true, slug: true, name: true },
        },
        editions: {
          where: { status: DocumentEditionStatus.PUBLISHED },
          orderBy: { publicationYear: 'desc' },
          include: {
            files: {
              orderBy: { createdAt: 'asc' },
            },
          },
        },
      },
    });

    if (!document) {
      throw new NotFoundException(`Không tìm thấy tác phẩm "${slug}" hoặc chưa được xuất bản.`);
    }

    return document;
  }

  /**
   * Lấy thông tin ấn bản, cây mục lục các bài kinh và tệp scan/âm thanh đính kèm.
   */
  async getEditionById(id: string) {
    const edition = await this.prisma.documentEdition.findFirst({
      where: {
        id,
        status: DocumentEditionStatus.PUBLISHED,
        document: { deletedAt: null },
      },
      include: {
        document: {
          select: {
            id: true,
            slug: true,
            title: true,
            authorOrIssuingBody: true,
            historicalOrigin: true,
            isComparativeReference: true,
            category: { select: { id: true, slug: true, name: true } },
          },
        },
        files: {
          orderBy: { createdAt: 'asc' },
        },
        sections: {
          orderBy: { orderIndex: 'asc' },
          select: {
            id: true,
            parentId: true,
            slug: true,
            title: true,
            orderIndex: true,
            printedPageLabel: true,
            pdfPageStart: true,
            pdfPageEnd: true,
            ritualTags: true,
            purposeTags: true,
            timingTags: true,
            tuneType: true,
          },
        },
      },
    });

    if (!edition) {
      throw new NotFoundException(`Không tìm thấy ấn bản "${id}" hoặc ấn bản chưa xuất bản.`);
    }

    return edition;
  }

  /**
   * Đọc nội dung chi tiết một bài kinh / chương mục kèm số trang bản scan gốc đối chiếu.
   */
  async getSectionById(id: string) {
    const section = await this.prisma.documentSection.findFirst({
      where: {
        id,
        edition: {
          status: DocumentEditionStatus.PUBLISHED,
          document: { deletedAt: null },
        },
      },
      include: {
        content: true,
        files: true,
        edition: {
          select: {
            id: true,
            editionLabel: true,
            publicationYear: true,
            publisher: true,
            sourceName: true,
            files: true,
          },
        },
      },
    });

    if (!section) {
      throw new NotFoundException(`Không tìm thấy bài kinh hoặc chương mục "${id}".`);
    }

    return section;
  }
}

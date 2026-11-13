import { Injectable, NotFoundException } from '@nestjs/common';
import { VisibilityLevel } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SitesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Trả về danh sách các công trình trọng tâm tại Tổ Đình Bến Tre
   * (Tòa Thánh, Điện Thờ Phật Mẫu, Nhà Tu Trung Thừa, Nhà Tu Thượng Thừa)
   * kèm các mục Lịch sử, Xây dựng, Đường đi đến.
   */
  async getFeaturedSites() {
    return this.prisma.worshipSite.findMany({
      where: {
        visibilityLevel: VisibilityLevel.PUBLIC_FEATURED,
        isFeaturedLandmark: true,
        deletedAt: null,
      },
      orderBy: { displayOrder: 'asc' },
      include: {
        sections: {
          orderBy: [{ sectionType: 'asc' }, { sortOrder: 'asc' }],
        },
      },
    });
  }

  /**
   * Chi tiết một công trình trọng tâm công khai theo slug.
   */
  async getFeaturedSiteBySlug(slug: string) {
    const site = await this.prisma.worshipSite.findFirst({
      where: {
        slug,
        visibilityLevel: VisibilityLevel.PUBLIC_FEATURED,
        deletedAt: null,
      },
      include: {
        sections: {
          orderBy: [{ sectionType: 'asc' }, { sortOrder: 'asc' }],
        },
      },
    });

    if (!site) {
      throw new NotFoundException(`Không tìm thấy công trình trọng tâm với slug "${slug}".`);
    }

    return site;
  }

  /**
   * Trả về danh mục Thánh Thất thu gọn (PUBLIC_COMPACT).
   * Chỉ trả về các trường tóm tắt an toàn, không lộ tọa độ hoặc thông tin nhạy cảm.
   */
  async getCompactSites(province?: string) {
    return this.prisma.worshipSite.findMany({
      where: {
        visibilityLevel: VisibilityLevel.PUBLIC_COMPACT,
        deletedAt: null,
        ...(province ? { province: { contains: province, mode: 'insensitive' } } : {}),
      },
      orderBy: { displayOrder: 'asc' },
      select: {
        id: true,
        slug: true,
        name: true,
        siteType: true,
        province: true,
        currentAddress: true,
        verificationStatus: true,
      },
    });
  }
}


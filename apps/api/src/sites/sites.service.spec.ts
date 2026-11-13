import { NotFoundException } from '@nestjs/common';
import { VisibilityLevel } from '@prisma/client';
import { SitesService } from './sites.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SitesService', () => {
  let service: SitesService;
  let prismaMock: {
    worshipSite: {
      findMany: jest.Mock;
      findFirst: jest.Mock;
    };
  };

  beforeEach(() => {
    prismaMock = {
      worshipSite: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
      },
    };
    service = new SitesService(prismaMock as unknown as PrismaService);
  });

  it('getFeaturedSites should query PUBLIC_FEATURED landmarks ordered by displayOrder', async () => {
    prismaMock.worshipSite.findMany.mockResolvedValue([{ slug: 'toa-thanh-ben-tre' }]);

    const result = await service.getFeaturedSites();

    expect(result).toEqual([{ slug: 'toa-thanh-ben-tre' }]);
    expect(prismaMock.worshipSite.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          visibilityLevel: VisibilityLevel.PUBLIC_FEATURED,
          isFeaturedLandmark: true,
          deletedAt: null,
        },
        orderBy: { displayOrder: 'asc' },
      }),
    );
  });

  it('getFeaturedSiteBySlug should throw NotFoundException when site is missing', async () => {
    prismaMock.worshipSite.findFirst.mockResolvedValue(null);

    await expect(service.getFeaturedSiteBySlug('unknown-slug')).rejects.toThrow(NotFoundException);
  });

  it('getCompactSites should only select safe summary fields for PUBLIC_COMPACT', async () => {
    prismaMock.worshipSite.findMany.mockResolvedValue([
      {
        id: '1',
        slug: 'thanh-that-thu-do-ha-noi',
        name: 'Thánh Thất Thủ Đô Hà Nội',
        siteType: 'THANH_THAT',
        province: 'Hà Nội',
        currentAddress: 'TP. Hà Nội (hiển thị thu gọn)',
        verificationStatus: 'VERIFIED',
      },
    ]);

    const result = await service.getCompactSites('Hà Nội');

    expect(result).toHaveLength(1);
    expect(prismaMock.worshipSite.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          visibilityLevel: VisibilityLevel.PUBLIC_COMPACT,
          deletedAt: null,
          province: { contains: 'Hà Nội', mode: 'insensitive' },
        }),
        select: {
          id: true,
          slug: true,
          name: true,
          siteType: true,
          province: true,
          currentAddress: true,
          verificationStatus: true,
        },
      }),
    );
  });
});


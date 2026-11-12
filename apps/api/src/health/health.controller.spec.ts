import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { PrismaService } from '../prisma/prisma.service';

describe('HealthController', () => {
  let controller: HealthController;
  let prismaService: { $queryRaw: jest.Mock };

  beforeEach(async () => {
    prismaService = {
      $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health status ok when database is healthy', async () => {
    const result = await controller.check();
    expect(result).toHaveProperty('status', 'ok');
    expect(result).toHaveProperty('service', 'Ban Chinh Dao Digital Library API');
    expect(result).toHaveProperty('version', '0.1.0');
    expect(result).toHaveProperty('timestamp');
    expect(result).toHaveProperty('uptimeSeconds');
    expect(result.database).toHaveProperty('status', 'healthy');
  });

  it('should return degraded status when database query fails', async () => {
    prismaService.$queryRaw.mockRejectedValue(new Error('Connection timeout'));
    const result = await controller.check();
    expect(result).toHaveProperty('status', 'degraded');
    expect(result.database).toHaveProperty('status', 'unhealthy');
    expect(result.database).toHaveProperty('error', 'Connection timeout');
  });
});

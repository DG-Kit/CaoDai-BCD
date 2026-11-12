import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('Health Check')
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Kiểm tra trạng thái hoạt động của hệ thống Backend và Database' })
  @ApiResponse({ status: 200, description: 'Hệ thống hoạt động bình thường' })
  async check() {
    let dbStatus = 'healthy';
    let dbLatencyMs: number | null = null;
    let dbError: string | null = null;

    const start = Date.now();
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      dbLatencyMs = Date.now() - start;
    } catch (err: unknown) {
      dbStatus = 'unhealthy';
      dbError = err instanceof Error ? err.message : 'Database query failed';
    }

    return {
      status: dbStatus === 'healthy' ? 'ok' : 'degraded',
      service: 'Ban Chinh Dao Digital Library API',
      version: '0.1.0',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      database: {
        status: dbStatus,
        latencyMs: dbLatencyMs,
        ...(dbError ? { error: dbError } : {}),
      },
    };
  }
}

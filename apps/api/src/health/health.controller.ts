import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Kiểm tra trạng thái hoạt động của hệ thống Backend' })
  @ApiResponse({ status: 200, description: 'Hệ thống hoạt động bình thường' })
  check() {
    return {
      status: 'ok',
      service: 'Ban Chinh Dao Digital Library API',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    };
  }
}

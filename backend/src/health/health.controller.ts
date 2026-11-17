import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(private readonly dataSource: DataSource) {}

  // GET /api/health – kiểm tra backend và database đều sống (US-00)
  @Get()
  async check() {
    let database = 'down';
    try {
      await this.dataSource.query('SELECT 1');
      database = 'up';
    } catch {
      database = 'down';
    }
    return { status: 'ok', database, time: new Date().toISOString() };
  }
}

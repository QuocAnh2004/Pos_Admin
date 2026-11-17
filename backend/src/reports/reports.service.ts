import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders/order.entity';

export interface TodaySummary {
  date: string; // yyyy-mm-dd
  revenue: number; // tổng tiền (VND)
  orderCount: number;
}

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Order) private readonly orderRepo: Repository<Order>) {}

  /**
   * GET /api/reports/today
   *
   * TODO(T-18):
   *   1. Tính mốc đầu ngày hôm nay (00:00) và đầu ngày mai theo giờ Việt Nam
   *   2. Dùng QueryBuilder để SUM(total) và COUNT(*) với created_at trong khoảng đó
   *        gợi ý: this.orderRepo.createQueryBuilder('o').select('COALESCE(SUM(o.total), 0)', 'revenue')...
   *   3. PostgreSQL trả SUM/COUNT về dạng string -> nhớ Number(...) trước khi trả về
   *   Vì sao để database cộng, không lấy hết đơn về rồi cộng bằng JS?
   *   -> 1.000 đơn/ngày × 30 ngày = 30.000 dòng, DB cộng nhanh hơn và không tốn RAM server.
   */
  async todaySummary(): Promise<TodaySummary> {
    throw new NotImplementedException('TODO(T-18): todaySummary');
  }
}

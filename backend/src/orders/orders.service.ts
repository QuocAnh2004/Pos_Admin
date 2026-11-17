import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../catalog/product.entity';
import { CheckoutDto, CheckoutResult } from './dto/checkout.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
  ) {}

  /**
   * Trái tim của dự án: bấm "Thanh toán" -> lưu đơn.
   *
   * TODO(T-15): làm theo 6 bước
   *   1. Lấy danh sách productId từ dto.items, truy vấn 1 lần duy nhất
   *        gợi ý: this.productRepo.findBy({ id: In(ids) })   (không query trong vòng lặp!)
   *   2. Đưa kết quả vào Map<id, Product> để tra cứu O(1)
   *   3. Với mỗi item: món không tồn tại hoặc active = false -> ném BadRequestException
   *   4. Tính total = tổng (giá trong DB × quantity). Không dùng giá client gửi.
   *   5. Nếu CASH: cashReceived phải >= total, ngược lại ném BadRequestException
   *   6. Lưu Order + các OrderItem trong 1 transaction (giống @Transactional):
   *        await this.dataSource.transaction(async (manager) => { ... manager.save(...) ... })
   *      Lỗi giữa chừng -> rollback toàn bộ, không có đơn "nửa vời".
   *   Trả về CheckoutResult { orderId, total, cashReceived, change }
   */
  async checkout(dto: CheckoutDto): Promise<CheckoutResult> {
    throw new NotImplementedException('TODO(T-15): checkout');
  }
}

import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { PaymentMethod } from '../payment-method.enum';

/** 1 dòng trong giỏ hàng client gửi lên. Chỉ gửi id + số lượng, KHÔNG gửi giá. */
export class CheckoutItemDto {
  @IsInt()
  @Min(1)
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

/** POST /api/orders/checkout */
export class CheckoutDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items: CheckoutItemDto[];

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  // Tiền khách đưa – bắt buộc với CASH
  @IsOptional()
  @IsInt()
  @Min(0)
  cashReceived?: number;
}

/** Kết quả trả về cho màn hình POS */
export interface CheckoutResult {
  orderId: number;
  total: number;
  cashReceived: number;
  change: number; // tiền thừa trả khách
}

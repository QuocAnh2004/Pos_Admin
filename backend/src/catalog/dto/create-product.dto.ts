import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * Dữ liệu client gửi lên khi tạo món mới (POST /api/products).
 * ValidationPipe trong main.ts sẽ tự trả lỗi 400 nếu dữ liệu sai (giống @Valid trong Spring).
 * Lưu ý: field nào KHÔNG có decorator sẽ bị từ chối (forbidNonWhitelisted).
 */
export class CreateProductDto {
  // Ví dụ mẫu đã làm sẵn:
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  // TODO(T-06): thêm decorator để bắt buộc price là số nguyên > 0
  //   gợi ý: @IsInt() và @Min(...)
  price: number;

  // TODO(T-06): categoryId là số nguyên dương
  categoryId: number;

  // TODO(T-06): active là boolean và không bắt buộc (@IsOptional)
  active?: boolean;
}

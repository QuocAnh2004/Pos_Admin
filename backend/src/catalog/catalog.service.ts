import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';

@Injectable()
export class CatalogService {
  // Repository được Nest inject sẵn (giống JpaRepository trong Spring)
  constructor(
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
  ) {}

  /** GET /api/categories */
  async findAllCategories(): Promise<Category[]> {
    // TODO(T-07): trả về tất cả danh mục, sắp xếp theo id tăng dần
    //   gợi ý: this.categoryRepo.find({ order: ... })
    throw new NotImplementedException('TODO(T-07): findAllCategories');
  }

  /** GET /api/products?activeOnly=true */
  async findAllProducts(activeOnly: boolean): Promise<Product[]> {
    // TODO(T-07):
    //   1. Nếu activeOnly = true thì chỉ lấy món đang bán (active = true)
    //   2. Sắp xếp theo tên món
    throw new NotImplementedException('TODO(T-07): findAllProducts');
  }

  /** POST /api/products */
  async createProduct(dto: CreateProductDto): Promise<Product> {
    // TODO(T-06):
    //   1. Kiểm tra categoryId có tồn tại không -> nếu không, ném NotFoundException
    //   2. Tạo entity từ dto (this.productRepo.create) rồi lưu (save)
    throw new NotImplementedException('TODO(T-06): createProduct');
  }

  /** PUT /api/products/:id */
  async updateProduct(id: number, dto: UpdateProductDto): Promise<Product> {
    // TODO(T-07):
    //   1. Tìm món theo id -> không có thì ném NotFoundException
    //   2. Nếu dto có categoryId thì kiểm tra danh mục tồn tại
    //   3. Gộp dữ liệu mới vào entity (this.productRepo.merge) rồi save
    throw new NotImplementedException('TODO(T-07): updateProduct');
  }
}

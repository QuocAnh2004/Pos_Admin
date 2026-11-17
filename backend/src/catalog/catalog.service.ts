import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./product.entity";

@Injectable()
export class CatalogService {
  // Repository được Nest inject sẵn (giống JpaRepository trong Spring)
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  /** GET /api/categories */
  async findAllCategories(): Promise<Category[]> {
    // TODO(T-07): trả về tất cả danh mục, sắp xếp theo id tăng dần
    //   gợi ý: this.categoryRepo.find({ order: ... })
    return this.categoryRepo.find({order:{id: 'ASC'}});
  }

  /** GET /api/products?activeOnly=true */
  async findAllProducts(activeOnly: boolean): Promise<Product[]> {
    // TODO(T-07):
    //   1. Nếu activeOnly = true thì chỉ lấy món đang bán (active = true)
    //   2. Sắp xếp theo tên món
    if(activeOnly){
      return this.productRepo.find({order:{name: 'ASC'}});
    }
    throw new NotImplementedException("TODO(T-07): findAllProducts");
  }

  /** POST /api/products */
  async createProduct(dto: CreateProductDto): Promise<Product> {
    // TODO(T-06):
    //   1. Kiểm tra categoryId có tồn tại không -> nếu không, ném NotFoundException
    //   2. Tạo entity từ dto (this.productRepo.create) rồi lưu (save)
    await this.checkCategoryExists(dto.categoryId);
    const product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  /** PUT /api/products/:id */
  async updateProduct(id: number, dto: UpdateProductDto): Promise<Product> {
    // TODO(T-07):
    //   1. Tìm món theo id -> không có thì ném NotFoundException
    //   2. Nếu dto có categoryId thì kiểm tra danh mục tồn tại
    //   3. Gộp dữ liệu mới vào entity (this.productRepo.merge) rồi save
      if(dto.categoryId) {
        await this.checkCategoryExists(dto.categoryId);
      }
      const product = await this.productRepo.findOne({where:{id}});
      if(!product) {
        throw new NotFoundException(`Không tìm thấy món có id ${id}`);
      }
      this.productRepo.merge(product, dto);
      return this.productRepo.save(product);

    }

   private async checkCategoryExists(categoryId: number): Promise<void> {
      const exists = await this.categoryRepo.exists({ where: { id:categoryId },});
      if (!exists) {
      throw new NotFoundException(
        `Không tìm thấy danh mục có id ${categoryId}`,
      );
  }
}
 
}

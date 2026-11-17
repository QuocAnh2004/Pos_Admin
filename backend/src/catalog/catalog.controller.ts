import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// Controller chỉ nhận request và gọi service – logic nằm hết ở CatalogService
@Controller()
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('categories')
  findAllCategories() {
    return this.catalogService.findAllCategories();
  }

  @Get('products')
  findAllProducts(@Query('activeOnly') activeOnly?: string) {
    return this.catalogService.findAllProducts(activeOnly === 'true');
  }

  @Post('products')
  createProduct(@Body() dto: CreateProductDto) {
    return this.catalogService.createProduct(dto);
  }

  @Put('products/:id')
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.catalogService.updateProduct(id, dto);
  }
}

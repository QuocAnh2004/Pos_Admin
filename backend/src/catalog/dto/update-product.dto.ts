import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

// Sửa món: mọi field đều không bắt buộc, nhưng nếu gửi thì vẫn phải đúng luật của CreateProductDto
export class UpdateProductDto extends PartialType(CreateProductDto) {}

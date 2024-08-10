import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name product TH',
    example: 'ยาแดง',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  nameTH: string;

  @ApiProperty({
    description: 'Name product EN',
    example: 'Red potion',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  nameEN: string;

  @ApiProperty({
    description: 'Price product',
    example: 10.0,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Image',
    example: 'test.png',
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Quantity product',
    example: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Cost product',
    example: 10.0,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  cost: string;

  @ApiProperty({
    description: 'Available product',
    example: true,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  available: boolean;

  @ApiProperty({
    description: 'CategoryId',
    example: 'aaabbcc',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}

export class CreateArrayProductDto {
  @ApiProperty({
    type: [CreateProductDto],
    description: 'Array of product',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];
}

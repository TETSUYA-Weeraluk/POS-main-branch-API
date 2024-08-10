import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCodeDto {
  @ApiProperty({
    description: 'Code',
    example: 'Hello123',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Description',
    example: 'ลด 10%',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Discount',
    example: 10,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @ApiProperty({
    description: 'Is Percentage',
    example: true,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isPercentage: boolean;

  @ApiProperty({
    description: 'Is Active',
    example: true,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'limit',
    example: 5,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: 'BranchId',
    example: 'aaabbccdd',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  branchId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category name TH',
    example: 'ของใช้งาน',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  nameTH: string;

  @ApiProperty({
    description: 'Category name EN',
    example: 'Usable items',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  nameEN: string;

  @ApiProperty({
    description: 'Branch Id',
    example: '1111',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  branchId: string;
}

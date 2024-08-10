import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBranchDto {
  @ApiProperty({
    example: 'Poring Shop',
    description: 'Name Branch',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Payon',
    description: 'Address Branch',
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: '111-222-333',
    description: 'Phone Branch',
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: '1',
    description: 'Restaurant ID',
  })
  @IsNotEmpty()
  restaurantId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({
    description: 'name',
    required: true,
    default: 'Ragnarok',
  })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'User ID',
    required: true,
  })
  userId: string;
}

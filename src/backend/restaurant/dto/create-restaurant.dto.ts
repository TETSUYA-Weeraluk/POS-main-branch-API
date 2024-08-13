import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({
    description: 'name',
    required: true,
    default: 'Ragnarok',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Image',
  })
  @IsString()
  image: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'User ID',
    required: true,
  })
  userId: string;
}

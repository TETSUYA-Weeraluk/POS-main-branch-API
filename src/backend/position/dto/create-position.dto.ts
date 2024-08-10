import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty({
    description: 'Position name',
    example: 'Manager',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Branch',
    example: 'Poring Shop',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  branchId: string;
}

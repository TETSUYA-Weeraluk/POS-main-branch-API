import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'Employee name',
    example: 'TETSUYA',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'email',
    example: 'test@test.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'phone',
    example: '111-222-333',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Address',
    example: 'Payao',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Branch',
    example: 'Poring Shop',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  branchId: string;

  @ApiProperty({
    description: 'Position',
    example: 'Manager',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  positionId: string;

  @ApiProperty({
    description: 'Salary',
    example: 100000,
    required: true,
  })
  @IsNotEmpty()
  salary: number;
}

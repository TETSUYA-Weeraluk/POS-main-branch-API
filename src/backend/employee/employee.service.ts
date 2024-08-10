import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class EmployeeService {
  constructor(private db: DbService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.db.employee.findUnique({
      where: { email: createEmployeeDto.email },
    });

    if (employee) {
      throw new BadRequestException('Employee already exists');
    }

    const newEmployee = await this.db.employee.create({
      data: {
        ...createEmployeeDto,
        EmployeeBranch: {
          create: {
            branchId: createEmployeeDto.branchId,
          },
        },
      },
      include: {
        EmployeeBranch: true,
      },
    });

    return newEmployee;
  }

  findAll() {
    return this.db.employee.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  async remove(id: string) {
    return await this.db.employee.delete({
      where: { id },
    });
  }
}

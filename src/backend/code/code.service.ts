import { Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class CodeService {
  constructor(private db: DbService) {}
  async create(createCodeDto: CreateCodeDto) {
    const codeDiscount = this.db.code.create({
      data: createCodeDto,
    });

    return codeDiscount;
  }

  async findAll() {
    return this.db.code.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} code`;
  }

  update(id: number, updateCodeDto: UpdateCodeDto) {
    return `This action updates a #${id} code`;
  }

  remove(id: number) {
    return `This action removes a #${id} code`;
  }
}

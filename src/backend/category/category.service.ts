import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class CategoryService {
  constructor(private db: DbService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.db.category.create({
      data: {
        nameTH: createCategoryDto.nameTH,
        nameEN: createCategoryDto.nameEN,
        branchId: createCategoryDto.branchId,
      },
    });

    return category;
  }

  async findAll() {
    return await this.db.category.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class PositionService {
  constructor(private db: DbService) {}

  async create(createPositionDto: CreatePositionDto) {
    const position = await this.db.position.findUnique({
      where: { name: createPositionDto.name },
    });

    if (position) {
      throw new BadRequestException('Position already exists');
    }

    const newPosition = await this.db.position.create({
      data: createPositionDto,
    });

    return newPosition;
  }

  async findAll() {
    return await this.db.position.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} position`;
  }

  update(id: number, updatePositionDto: UpdatePositionDto) {
    return `This action updates a #${id} position`;
  }

  remove(id: number) {
    return `This action removes a #${id} position`;
  }
}

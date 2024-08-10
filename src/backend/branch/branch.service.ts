import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class BranchService {
  constructor(private db: DbService) {}

  async create(createBranchDto: CreateBranchDto) {
    try {
      const branch = await this.findByName(createBranchDto.name);

      if (branch) {
        throw new ConflictException('Branch already exists');
      }

      const newBranch = await this.db.branch.create({
        data: createBranchDto,
      });

      return newBranch;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    return await this.db.branch.findMany();
  }

  async findByName(name: string) {
    try {
      const branch = await this.db.branch.findUnique({
        where: {
          name: name,
        },
      });

      return branch;
    } catch (error) {
      console.log('error', error);
      throw new Error('Error finding branch by name');
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} branch`;
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch`;
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateArrayProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ProductService {
  constructor(private db: DbService) {}
  async create(createProductDto: CreateArrayProductDto) {
    await this.db.product.deleteMany();
    const newProducts = [];

    const product = await this.db.$transaction(async (prisma) => {
      for (const data of createProductDto.products) {
        const product = await prisma.product.create({
          data: data,
        });

        newProducts.push(product);
      }
    });

    console.log(product);

    return newProducts;
  }

  findAll() {
    return this.db.product.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

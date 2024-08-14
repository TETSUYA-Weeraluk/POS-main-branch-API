import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { DbService } from 'src/db/db.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RestaurantService {
  private includeSelect: Prisma.RestaurantSelect = {
    id: true,
    name: true,
    image: true,
    userRestaurant: {
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    },
    branch: {
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
            position: true,
            salary: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        category: true,
        code: true,
      },
    },
    createdAt: true,
    updatedAt: true,
  };

  constructor(private db: DbService) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    try {
      const restaurant = await this.findByName(createRestaurantDto.name);

      if (restaurant) {
        throw new ConflictException('Restaurant already exists');
      }

      const user = await this.db.user.findUnique({
        where: {
          id: createRestaurantDto.userId,
        },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const newRestaurant = await this.db.restaurant.create({
        data: {
          name: createRestaurantDto.name,
        },
        select: this.includeSelect,
      });

      await this.db.userRestaurant.create({
        data: {
          userId: createRestaurantDto.userId,
          restaurantId: newRestaurant.id,
        },
      });

      return newRestaurant;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    const restaurants = await this.db.restaurant.findMany({
      select: this.includeSelect,
    });

    return restaurants;
  }

  async findByName(name: string) {
    try {
      const restaurant = await this.db.restaurant.findUnique({
        where: {
          name,
        },
      });

      return restaurant;
    } catch (error) {
      console.log('error', error);
      throw new Error('Error finding restaurant by name');
    }
  }

  async findOwned(userId: string) {
    try {
      const restaurants = await this.db.restaurant.findMany({
        where: {
          userRestaurant: {
            some: {
              userId,
            },
          },
        },
        select: {
          id: true,
          name: true,
          image: true,
          userRestaurant: {
            select: {
              user: {
                select: {
                  email: true,
                  name: true,
                  role: true,
                },
              },
            },
          },
          branch: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      return restaurants;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} restaurant`;
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    try {
      const restaurant = await this.db.restaurant.findUnique({
        where: {
          id,
        },
      });

      if (!restaurant) {
        throw new BadRequestException('Restaurant not found');
      }

      const updatedRestaurant = this.db.restaurant.update({
        where: {
          id,
        },
        data: updateRestaurantDto,
        select: this.includeSelect,
      });

      return updatedRestaurant;
    } catch (error) {}
    return;
  }

  remove(id: string) {
    try {
      const restaurant = this.db.restaurant.delete({
        where: {
          id,
        },
        select: this.includeSelect,
      });

      return restaurant;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}

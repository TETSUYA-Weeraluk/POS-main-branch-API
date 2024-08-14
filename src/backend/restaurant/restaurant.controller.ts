import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ApiTags } from '@nestjs/swagger';
import * as jwt from 'jsonwebtoken';

@Controller('restaurant')
@ApiTags('Restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @Headers('authorization') authorization: string,
  ) {
    const token = authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const userId = decode['id'];
    return this.restaurantService.create({
      ...createRestaurantDto,
      userId,
    });
  }

  @Get('GetOwner')
  getOwner(@Headers('authorization') authorization: string) {
    const token = authorization.split(' ')[1];
    const decode = jwt.decode(token);
    return this.restaurantService.findOwned(decode['id']);
  }

  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(id);
  }
}

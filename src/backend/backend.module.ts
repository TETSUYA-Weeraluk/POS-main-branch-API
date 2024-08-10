import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { BranchModule } from './branch/branch.module';
import { PositionModule } from './position/position.module';
import { EmployeeModule } from './employee/employee.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CodeModule } from './code/code.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    UsersModule,
    RestaurantModule,
    BranchModule,
    PositionModule,
    EmployeeModule,
    CategoryModule,
    ProductModule,
    CodeModule,
    OrderItemModule,
    OrdersModule,
  ],
  providers: [],
})
export class BackendModuleModule {}

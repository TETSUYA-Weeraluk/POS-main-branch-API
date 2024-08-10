import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { dataArmor, dataCard, dataPotion, dataWeapon } from './data-product';

const prisma = new PrismaClient();

const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

async function main() {
  await prisma.user.deleteMany();
  await prisma.orders.deleteMany();
  await prisma.product.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.position.deleteMany();
  await prisma.category.deleteMany();
  await prisma.code.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.restaurant.deleteMany();

  const user = await prisma.user.create({
    data: {
      name: 'test',
      email: 'test@test.com',
      passwordHash: await hashPassword('test'),
    },
  });

  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Ragnarok',
      image: 'poring.png',
      userRestaurant: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  const restaurant2 = await prisma.restaurant.create({
    data: {
      name: 'Tera Kashiten',
      image: 'tera.jpg',
      userRestaurant: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  const branch = await prisma.branch.create({
    data: {
      name: 'Poring Shop',
      address: 'Payon',
      phone: '112233',
      image: restaurant.image,
      restaurantId: restaurant.id,
    },
  });

  const branch2 = await prisma.branch.create({
    data: {
      name: 'Tera Kashiten 1',
      address: 'Phuket',
      phone: '11111111',
      image: restaurant2.image,
      restaurantId: restaurant.id,
    },
  });

  const position = await prisma.position.create({
    data: {
      name: 'Cashier',
      branchId: branch.id,
    },
  });

  await prisma.employee.create({
    data: {
      name: 'Test Employee',
      email: 'test@employee.com',
      phone: '123456',
      address: 'Payon Pa Ruay',
      salary: 1000,
      branchId: branch.id,
      positionId: position.id,
      EmployeeBranch: {
        create: {
          branchId: branch.id,
        },
      },
    },
  });

  const category = await prisma.category.create({
    data: {
      nameTH: 'ของใช้งาน',
      nameEN: 'Useable Item',
      branchId: branch.id,
    },
  });

  const categoryArmor = await prisma.category.create({
    data: {
      nameTH: 'อาวุธ',
      nameEN: 'Weapon',
      branchId: branch.id,
    },
  });

  const categoryWeapons = await prisma.category.create({
    data: {
      nameTH: 'Armor',
      nameEN: 'ของสวมใส่',
      branchId: branch.id,
    },
  });

  const categoryCard = await prisma.category.create({
    data: {
      nameTH: 'การ์ด',
      nameEN: 'Card',
      branchId: branch.id,
    },
  });

  await prisma.$transaction(async (prisma) => {
    for (const data of dataPotion) {
      await prisma.product.create({
        data: {
          ...data,
          categoryId: category.id,
        },
      });
    }
  });

  await prisma.$transaction(async (prisma) => {
    for (const data of dataWeapon) {
      await prisma.product.create({
        data: {
          ...data,
          categoryId: categoryWeapons.id,
        },
      });
    }
  });

  await prisma.$transaction(async (prisma) => {
    for (const data of dataArmor) {
      await prisma.product.create({
        data: {
          ...data,
          categoryId: categoryArmor.id,
        },
      });
    }
  });

  await prisma.$transaction(async (prisma) => {
    for (const data of dataCard) {
      await prisma.product.create({
        data: {
          ...data,
          categoryId: categoryCard.id,
        },
      });
    }
  });

  const codeDiscount = await prisma.code.create({
    data: {
      code: 'DISCOUNT10',
      description: 'Discount 10%',
      discount: 10,
      isPercentage: true,
      isActive: true,
      limit: 10,
      branchId: branch.id,
    },
  });

  const findProduct = await prisma.product.findFirst();

  await prisma.orders.create({
    data: {
      status: 'PENDING',
      takeAway: false,
      table: 'Table1',
      total: 100,
      totalPaid: 90,
      discount: 10,
      totalQuantity: 10,
      items: {
        create: {
          productId: findProduct.id,
          quantity: 10,
        },
      },
      codeId: codeDiscount.id,
      branchId: branch.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

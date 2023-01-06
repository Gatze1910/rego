import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: 'Hansi',
      lastname: 'Tester',
      email: 'test@hansi.com',
    },
  })

  await prisma.shop.create({
    data: {
      name: 'erster Testshop',
      street: 'Hornerweg 24',
      postcode: 5541,
      ownerId: 1,
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

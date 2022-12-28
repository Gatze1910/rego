import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: 'user2',
      lastname: 'tester',
      email: `testemai2l@gmail.com`,
      role: 'ADMIN',
    },
  })

  await prisma.shop.create({
    data: {
      id: '52e84941-2c72-4ea9-b15d-a3e0f1524442',
      name: 'erster Testshop',
      street: 'Hornerweg 24',
      postcode: 5541,
    },
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

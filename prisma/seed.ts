import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.shop.create({
    data: {
      name: 'Paradis in den Bergen',
      street: 'Hornerweg 24',
      postcode: '5541',
      place: 'Altenmarkt',
      ownerUuid: '0ZLqb20tCGOO8dbj4xS9oGA0dUf2',
      latitude: 47.3639155,
      longitude: 13.4424461,
    },
  })

  await prisma.news.create({
    data: {
      id: 1,
      shopId: 1,
      title: 'Sale Sale Sale',
      content: 'Alles muss raus!',
    },
  })

  await prisma.recipe.create({
    data: {
      id: 1,
      shopId: 1,
      title: 'Schokokuchen',
      content: 'schnell und einfach zubereitet',
    },
  })

  await prisma.product.create({
    data: {
      id: 1,
      shopId: 1,
      title: 'Erdbeertraum',
      content: 'mega leckere Erdbeermarmelade',
    },
  })

  await prisma.shop.create({
    data: {
      name: 'Fritz Fischis',
      street: 'Fritzbach 24',
      postcode: '5555',
      place: 'Fürstenfeld',
      ownerUuid: '0ZLqb20tCGOO8dbj4xS9oGA0dUf2',
      latitude: 38.3639155,
      longitude: 20.4424461,
      categories: '[1,2,3]',
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

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.shop.create({
    data: {
      name: 'zweiter Testshop',
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
      title: 'ich bin die erste Neuigkeit',
      content: 'so happy to be the first new',
    },
  })

  await prisma.recipe.create({
    data: {
      id: 1,
      shopId: 1,
      title: 'ich bin das erste Rezept',
      content: 'so happy to be the first recipe',
    },
  })

  await prisma.product.create({
    data: {
      id: 1,
      shopId: 1,
      title: 'ich bin das erste Produkt',
      content: 'mega leckere Erdbeermarmelade',
    },
  })

  await prisma.shop.create({
    data: {
      name: 'dritter Testshop',
      street: 'test 24',
      postcode: '5550',
      place: 'testort',
      ownerUuid: '0ZLqb20tCGOO8dbj4xS9oGA0dUf2',
      latitude: 38.3639155,
      longitude: 20.4424461,
      categories:
        '[{"id":1,"img":"instagram.png","color":"red","text":"essen"},{"id":2,"img":"instagram.png","color":"blue","text":"nahrung"}]',
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

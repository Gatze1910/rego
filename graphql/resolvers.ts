export const resolvers = {
  Query: {
    shops: (_parent, _args, context) => {
      return context.prisma.shop.findMany()
    },
    news: (_parent, _args, context) => {
      return context.prisma.shop.findMany()
    },
  },
}

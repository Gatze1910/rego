export const resolvers = {
    Query: {
      shops: (_parent, _args, context) => {
        return context.prisma.shop.findMany()
      },
      users: (_parent, _args, context) => {
        return context.prisma.user.findMany()
      },
    },
  }
  
export const resolvers = {
  Query: {
    shops: (_parent, _args, context) => {
      return context.prisma.shop.findMany()
    },
    news: (_parent, _args, context) => {
      return context.prisma.news.findMany()
    },
    products: (_parent, _args, context) => {
      return context.prisma.product.findMany()
    },
    recipes: (_parent, _args, context) => {
      return context.prisma.recipe.findMany()
    },
  },
}

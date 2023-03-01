import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'
import { Shop } from './Shop'

export const Recipe = objectType({
  name: 'Recipe',
  definition(t) {
    t.int('id')
    t.string('title')
    t.string('content')
    t.string('image')
    t.field('shop', {
      type: Shop,
      resolve: (parent, _args, ctx) => {
        return ctx.prisma.recipe
          .findUnique({
            where: { id: parent.id },
          })
          .shop()
      },
    })
  },
})

export const RecipeQuery = extendType({
  type: 'Query',
  definition(t) {
    // get all recipes
    t.list.field('recipes', {
      type: Recipe,
      resolve(_parent, _args, context) {
        return context.prisma.recipe.findMany()
      },
    })

    // get one recipe by id
    t.field('recipe', {
      type: Recipe,
      args: {
        id: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.shop.findUnique({
          where: {
            id: args.id,
          },
        })
      },
    })
  },
})

export const RecipesMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // create a recipe
    t.nonNull.field('createRecipe', {
      type: Recipe,
      args: {
        shopId: nonNull(intArg()),
        title: nonNull(stringArg()),
        content: nonNull(stringArg()),
        image: stringArg(),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.recipe.create({
          data: {
            shopId: args.shopId,
            title: args.title,
            content: args.content,
            image: args.image,
          },
        })
      },
    })

    // update a recipe
    t.nonNull.field('updateRecipe', {
      type: Shop,
      args: {
        id: nonNull(intArg()),
        title: stringArg(),
        content: stringArg(),
        image: stringArg(),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.recipe.update({
          where: { id: args.id },
          data: {
            title: args.title,
            content: args.content,
            image: args.image,
          },
        })
      },
    })

    // delete a recipe
    t.nonNull.field('deleteRecipe', {
      type: Recipe,
      args: {
        id: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.recipe.delete({
          where: { id: args.id },
        })
      },
    })
  },
})

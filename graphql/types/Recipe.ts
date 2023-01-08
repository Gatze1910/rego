import { extendType, objectType, queryType } from 'nexus'

export const Recipe = objectType({
  name: 'Recipe',
  definition(t) {
    t.int('id')
    t.int('userId')
    t.string('title')
    t.string('content')
    t.string('categories')
  },
})

export const RecipeQuery = queryType({
  definition(t) {
    t.list.field('recipes', {
      type: 'Recipe',
      resolve(_, __, context) {
        return context.prisma.recipe.findMany()
      },
    })
  },
})
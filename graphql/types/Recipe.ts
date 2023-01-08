import { extendType, objectType, queryType } from 'nexus'

export const Recipe = objectType({
  name: 'Recipe',
  definition(t) {
    t.int('id')
    t.int('userId')
    t.string('title')
    t.string('content')
    t.field("categories", {
        type: "String",
        resolve(parent, _args, _context) {
        const str = parent["categories"];
          if (!str) {
            return {};
          }
          return JSON.parse(str);
        }
      });
  },
})

export const RecipeQuery = queryType({
  definition(t) {
    t.list.field('recipes', {
      type: 'Recipe',
      resolve(_parent, _args, context) {
        return context.prisma.recipe.findMany()
      },
    })
  },
})
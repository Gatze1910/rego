import { objectType, extendType } from 'nexus'
import { User } from './User'

export const Shop = objectType({
  name: 'Shop',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('street')
    t.int('postcode')
    t.string('email')
    t.field('owner', {
      type: User,
      async resolve(_parent, _args, context) {
        return await context.prisma.shop
          .findFirst({
            where: {
              id: _parent.id,
            },
          }).owner()
      },
    })
  },
})

export const ShopsQuery = extendType({
    type: 'Query',
    definition(t) {
      t.nonNull.list.field('shops', {
        type: 'Shop',
        resolve(_parent, _args, context) {
          return context.prisma.shop.findMany()
        },
      })
    },
  })
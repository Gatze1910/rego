import { objectType, extendType } from 'nexus'
import { User } from './User'

export const Shop = objectType({
  name: 'Shop',
  definition(t) {
    t.string('id')
    t.string('owner')
    t.string('name')
    t.string('street')
    t.int('postcode')
    t.string('email')
    t.list.field('users', {
      type: User,
      async resolve(_parent, _args, context) {
        return await context.prisma.shop
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .users()
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
import { objectType, extendType } from 'nexus'
import { Shop } from './Shop'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('lastname')
    t.string('street')
    t.int('postcode')
    t.int('phone')
    t.string('email')
    t.list.field('shops', {
      type: Shop,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .shops()
      },
    })
  },
})

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: 'User',
      resolve(_parent, _args, context) {
        return context.prisma.user.findMany()
      },
    })
  },
})

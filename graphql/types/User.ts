import { enumType, objectType, extendType } from 'nexus'
import { Shop } from './Shop'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('lastname')
    t.string('street')
    t.int('postcode')
    t.int('phone')
    t.string('email')
    t.field('role', { type: Role })
    t.list.field('shops', {
      type: Shop,
      async resolve(_parent, _args, context) {
        return await context.prisma.user
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

const Role = enumType({
    name: 'Role',
    members: ['USER', 'ADMIN'],
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
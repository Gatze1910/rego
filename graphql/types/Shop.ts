import { randomUUID } from 'crypto'
import { objectType, extendType, nonNull, intArg, stringArg } from 'nexus'
import { User } from './User'

export const Shop = objectType({
  name: 'Shop',
  definition(t) {
    t.int('id')
    t.int('ownerId')
    t.string('name')
    t.string('street')
    t.int('postcode')
    t.int('phone')
    t.string('email')
    t.field('owner', {
      type: User,
      async resolve(_parent, _args, context) {
        return await context.prisma.shop
          .findFirst({
            where: {
              ownerId: _parent.id,
            },
          }).owner()
      },
    })
  },
})

export const LinksQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('shops', {
      type: 'Shop',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.shop.findMany()
      }
    })
  },
})


export const CreateShopMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createShop', {
      type: Shop,
      args: {
        name: nonNull(stringArg()),
        street: nonNull(stringArg()),
        postcode: nonNull(intArg()),
        ownerId: nonNull(intArg())
      },
      async resolve(_parent, args, ctx) {

        /** 
        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`)
        }
        */
       const User = await ctx.prisma.user.findFirst();

        const newShop = {
          ownerId: args.ownerId,
          name: args.name,
          street: args.street,
          postcode: args.postcode
        }

        return await ctx.prisma.shop.create({
          data: newShop,
        })
      },
    })
  },
})

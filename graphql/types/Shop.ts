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
          })
          .owner()
      },
    })
  },
})

export const ShopsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('shops', {
      type: 'Shop',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.shop.findMany()
      },
    })
  },
})

export const ShopsByUserIdQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('shopsByUserId', {
      type: 'Shop',
      args: {
        ownerId: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.shop.findMany({ where: { ownerId: args.ownerId } })
      },
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
        ownerId: nonNull(intArg()),
        phone: intArg(),
        email: stringArg(),
      },
      async resolve(_parent, args, ctx) {
        /** 
        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`)
        }

        dann bei new shop irgendwie von ctx also session den user als user id setzen bei ownerId
        */

        const newShop = {
          ownerId: args.ownerId,
          name: args.name,
          street: args.street,
          postcode: args.postcode,
          phone: args.phone,
          email: args.email,
        }

        return await ctx.prisma.shop.create({
          data: newShop,
        })
      },
    })
  },
})

export const DeleteShopMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteShop', {
      type: 'Shop',
      args: {
        id: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.shop.delete({
          where: { id: args.id },
        })
      },
    })
  },
})

export const UpdateShopMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateShop', {
      type: 'Shop',
      args: {
        id: nonNull(intArg()),
        ownerId: intArg(),
        name: stringArg(),
        street: stringArg(),
        postcode: intArg(),
        phone: intArg(),
        email: stringArg(),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.shop.update({
          where: { id: args.id },
          data: {
            ownerId: args.ownerId,
            name: args.name,
            street: args.street,
            postcode: args.postcode,
            phone: args.phone,
            email: args.email,
          },
        })
      },
    })
  },
})

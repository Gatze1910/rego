import {
  objectType,
  extendType,
  nonNull,
  intArg,
  stringArg,
  floatArg,
} from 'nexus'
import { News } from './News'
import { User } from './User'

export const Shop = objectType({
  name: 'Shop',
  definition(t) {
    t.int('id')
    t.int('ownerId')
    t.string('name')
    t.string('street')
    t.int('postcode')
    t.string('place')
    t.float('latitude')
    t.float('longitude')
    t.int('phone')
    t.string('email')
    t.string('website')
    t.string('openingHours')
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
    t.field("categories", {
      type: "String",
      resolve(parent, _args, _ctx) {
      const str = parent["categories"];
        if (!str) {
          return {};
        }
        return JSON.parse(str);
      }
    });
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
        const shops = ctx.prisma.shop.findMany({
          where: {
            ownerId: args.ownerId,
          },
        })
        return shops
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
        place: nonNull(stringArg()),
        latitude: nonNull(floatArg()),
        longitude: nonNull(floatArg()),
        ownerId: nonNull(intArg()),
        phone: intArg(),
        email: stringArg(),
        website: stringArg(),
        categories: stringArg(),
        openingHours: stringArg(),
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
          place: args.place,
          website: args.website,
          categories: args.categories,
          longitude: args.longitude,
          latitude: args.latitude,
          phone: args.phone,
          email: args.email,
          openingHours: args.openingHours,
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
        place: stringArg(),
        latitude: floatArg(),
        longitude: floatArg(),
        website: stringArg(),
        categories: stringArg(),
        openingHours: stringArg(),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.shop.update({
          where: { id: args.id },
          data: {
            ownerId: args.ownerId,
            name: args.name,
            street: args.street,
            postcode: args.postcode,
            place: args.place,
            website: args.website,
            categories: args.categories,
            longitude: args.longitude,
            latitude: args.latitude,
            phone: args.phone,
            email: args.email,
            openingHours: args.openingHours,
          },
        })
      },
    })
  },
})

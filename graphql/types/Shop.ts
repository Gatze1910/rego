import {
  objectType,
  extendType,
  nonNull,
  intArg,
  stringArg,
  floatArg,
} from 'nexus'
import { News } from './News'
import { Recipe } from './Recipe'
import { Product } from './Product'

export const Shop = objectType({
  name: 'Shop',
  definition(t) {
    // here define all fields which can be queried if the Type is Shop
    t.int('id')
    t.string('ownerUuid')
    t.string('name')
    t.string('street')
    t.string('postcode')
    t.string('place')
    t.float('latitude')
    t.float('longitude')
    t.list.field('news', {
      type: News,
      resolve: (parent, _args, context) => {
        return context.prisma.shop
          .findUnique({
            where: { id: parent.id },
          })
          .news()
      },
    })
    t.list.field('products', {
      type: Product,
      resolve: (parent, _args, context) => {
        return context.prisma.shop
          .findUnique({
            where: { id: parent.id },
          })
          .products()
      },
    })
    t.list.field('recipes', {
      type: Recipe,
      resolve: (parent, _args, context) => {
        return context.prisma.shop
          .findUnique({
            where: { id: parent.id },
          })
          .recipes()
      },
    })
    t.string('image')
    t.string('phone')
    t.string('email')
    t.string('website')
    t.string('openingHours')
    t.string('categories')
  },
})

export const ShopQuery = extendType({
  type: 'Query',
  definition(t) {
    // get all shops
    t.list.field('shops', {
      type: 'Shop',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.shop.findMany()
      },
    })

    // get shop by id
    t.field('shop', {
      type: 'Shop',
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

    // get shops by ownerUuid
    t.list.field('shopsByOwner', {
      type: 'Shop',
      args: {
        ownerUuid: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.shop.findMany({
          where: {
            ownerUuid: args.ownerUuid,
          },
        })
      },
    })
  },
})

export const ShopMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createShop', {
      type: Shop,
      args: {
        name: nonNull(stringArg()),
        street: nonNull(stringArg()),
        postcode: nonNull(stringArg()),
        place: nonNull(stringArg()),
        latitude: nonNull(floatArg()),
        longitude: nonNull(floatArg()),
        image: stringArg(),
        phone: stringArg(),
        email: stringArg(),
        website: stringArg(),
        openingHours: stringArg(),
        categories: stringArg(),
      },
      resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`)
          return
        }

        return ctx.prisma.shop.create({
          data: {
            ownerUuid: ctx.user.sub,
            name: args.name,
            street: args.street,
            postcode: args.postcode,
            place: args.place,
            latitude: args.latitude,
            longitude: args.longitude,
            image: args.image,
            phone: args.phone,
            email: args.email,
            website: args.website,
            openingHours: args.openingHours,
            categories: args.categories,
          },
        })
      },
    })

    // update a shop
    t.nonNull.field('updateShop', {
      type: Shop,
      args: {
        id: nonNull(intArg()),
        name: stringArg(),
        street: stringArg(),
        postcode: stringArg(),
        place: stringArg(),
        latitude: floatArg(),
        longitude: floatArg(),
        image: stringArg(),
        phone: stringArg(),
        email: stringArg(),
        website: stringArg(),
        openingHours: stringArg(),
        categories: stringArg(),
      },
      resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`)
          return
        }
        return ctx.prisma.shop.update({
          where: { id: args.id },
          data: {
            ownerUuid: ctx.user.sub,
            name: args.name,
            street: args.street,
            postcode: args.postcode,
            place: args.place,
            latitude: args.latitude,
            longitude: args.longitude,
            image: args.image,
            phone: args.phone,
            email: args.email,
            website: args.website,
            openingHours: args.openingHours,
            categories: args.categories,
          },
        })
      },
    })

    // delete a shop
    t.nonNull.field('deleteShop', {
      type: Shop,
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

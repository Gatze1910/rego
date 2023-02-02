import {
  extendType,
  intArg,
  nonNull,
  objectType,
  queryType,
  stringArg,
} from 'nexus'
import { Shop } from './Shop'

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.int('id')
    t.string('title')
    t.string('content')
    t.string('image')
    t.field('shop', {
      type: Shop,
      resolve: (parent, _args, ctx) => {
        return ctx.prisma.recipe
          .findUnique({
            where: { id: parent.id },
          })
          .shop()
      },
    })
  },
})

export const ProductQuery = extendType({
  type: 'Query',
  definition(t) {
    // get all products
    t.list.field('products', {
      type: Product,
      resolve(_parent, _args, context) {
        return context.prisma.product.findMany()
      },
    })

    // get one product by id
    t.field('product', {
      type: Product,
      args: {
        id: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.product.findUnique({
          where: {
            id: args.id,
          },
        })
      },
    })
  },
})

export const ProductsMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // create a product
    t.nonNull.field('createProduct', {
      type: Product,
      args: {
        shopId: nonNull(intArg()),
        title: nonNull(stringArg()),
        content: stringArg(),
        image: stringArg(),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.product.create({
          data: {
            shopId: args.shopId,
            title: args.title,
            content: args.content,
            image: args.image,
          },
        })
      },
    })

    // update a product
    t.nonNull.field('updateProduct', {
      type: Product,
      args: {
        id: nonNull(intArg()),
        title: stringArg(),
        content: stringArg(),
        image: stringArg(),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.product.update({
          where: { id: args.id },
          data: {
            title: args.title,
            content: args.content,
            image: args.image,
          },
        })
      },
    })

    // delete a product
    t.nonNull.field('deleteProduct', {
      type: Product,
      args: {
        id: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.product.delete({
          where: { id: args.id },
        })
      },
    })
  },
})

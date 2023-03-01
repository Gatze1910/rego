import {
  extendType,
  inputObjectType,
  intArg,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { Shop } from './Shop'

export const News = objectType({
  name: 'News',
  definition(t) {
    t.int('id')
    t.string('title')
    t.string('content')
    t.field('shop', {
      type: Shop,
      resolve: (parent, _args, ctx) => {
        return ctx.prisma.news
          .findUnique({
            where: { id: parent.id },
          })
          .shop()
      },
    })
  },
})

// in case if we need to specify the input for a news entry
export const NewsInputType = inputObjectType({
  name: 'NewsInputType',
  definition(t) {
    t.nonNull.int('shopId')
    t.nonNull.string('title')
    t.nonNull.string('content')
  },
})

export const NewsQuery = extendType({
  type: 'Query',
  definition(t) {
    // get all news
    t.list.field('news', {
      type: News,
      resolve(_parent, _args, context) {
        return context.prisma.news.findMany()
      },
    })

    // get post (one new) by id
    t.field('post', {
      type: Shop,
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
  },
})

export const NewsMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // create a post
    t.nonNull.field('createPost', {
      type: News,
      args: {
        shopId: nonNull(intArg()),
        title: nonNull(stringArg()),
        content: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.news.create({
          data: {
            shopId: args.shopId,
            title: args.title,
            content: args.content,
          },
        })
      },
    })

    // update a post
    t.nonNull.field('updatePost', {
      type: Shop,
      args: {
        id: nonNull(intArg()),
        title: stringArg(),
        content: stringArg(),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.news.update({
          where: { id: args.id },
          data: {
            title: args.title,
            content: args.content,
          },
        })
      },
    })

    // delete a post
    t.nonNull.field('deletePost', {
      type: News,
      args: {
        id: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.news.delete({
          where: { id: args.id },
        })
      },
    })
  },
})

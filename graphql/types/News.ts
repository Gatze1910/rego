import { extendType, objectType } from 'nexus'

export const News = objectType({
  name: 'News',
  definition(t) {
    t.int('id')
    t.int('shopId')
    t.string('title')
    t.string('content')
  },
})

export const NewsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('news', {
      type: 'News',
      resolve(_parent, _args, context) {
        return context.prisma.news.findMany()
      },
    })
  },
})

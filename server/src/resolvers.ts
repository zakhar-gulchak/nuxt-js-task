import { context, Context } from './context';
import { Resolvers } from './__generated__/graphql';

const resolvers: Resolvers = {
  Query: {
    transactions: (_parent, { transactionsInput: { cursorId, limit, sortBy, sortOrder, accountId, search, dateFrom, dateTo } }) => {
      const where = {
        ...(accountId ?  { accountId } : {}),
        ...(search ? { reference: { contains: search } } : {}),
        ...(dateFrom ? { date: { gte: new Date(dateFrom) } } : {}),
        ...(dateTo ? { date: { lte: new Date(dateTo) } } : {})
      }
      let orderBy = {}
      if (sortBy === 'category') {
        orderBy = { category: { name: sortOrder }}
      } else if (sortBy) {
        orderBy = { [sortBy]: sortOrder }
      }

      return context.prisma.transaction.findMany({
        take: limit || 200,
        skip: 1,
        ...(cursorId ? { cursor: { id: cursorId } } : {}),
        where,
        include: {
          account: true,
          category: true
        },
        orderBy
      });
    },
    accounts: (_parent, { bankId }) => {
      const where = {
        ...(bankId ?  { bankId } : {})
      };
      return context.prisma.account.findMany({ include: { bank: true }, where })
    },
    banks: () => context.prisma.bank.findMany(),
    categories: () => context.prisma.category.findMany(),
    totalTransactionsCount: (_parent, { accountId, search, dateFrom, dateTo}) => {
      const where = {
        ...(accountId ?  { accountId } : {}),
        ...(search ? { reference: { contains: search } } : {}),
        ...(dateFrom ? { date: { gte: new Date(dateFrom) } } : {}),
        ...(dateTo ? { date: { lte: new Date(dateTo) } } : {})
      }

      return context.prisma.transaction.count({ where });
    },
  },
  // todo: find out why I need this
  // Account: {
  //   bank: (parent, _args, context: Context) => {
  //     return context.prisma.bank
  //       .findUnique({
  //         where: { id: parent?.bankId },
  //       })
  //   }
  // },
};

export default resolvers;

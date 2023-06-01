import { context, Context } from './context';
import { Resolvers } from './__generated__/graphql';

const resolvers: Resolvers = {
  Query: {
    transactions: (_parent, { cursorId, limit, sortBy, sortOrder, accountId, search }) => {
      const where = {
        ...(accountId ?  { accountId } : {}),
        ...(search ? { reference: {
          contains: search
        } } : {})
      }
      let orderBy = {}
      if (sortBy === 'category') {
        orderBy = {
          category: {
            name: sortOrder
          }
        }
      } else if (sortBy) {
        orderBy = {
            [sortBy]: sortOrder
        }
      }

      return context.prisma.transaction.findMany({
        take: limit,
        skip: 1,
        ...(cursorId ? { cursor: {
            id: cursorId,
          }} : {}),
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
    totalTransactionsCount: (_parent, { accountId, search}) => {
      const where = {
        ...(accountId ?  { accountId } : {}),
        ...(search ? { reference: {
            contains: search
          } } : {})
      }

      return context.prisma.transaction.count({ where });
    },
  },
  // Mutation: {
  //   addTransaction: (
  //     _parent,
  //     args: { amount: number, reference: string, currency: string, accountId: string, categoryId: string },
  //     context: Context,
  //   ) => {
  //     return context.prisma.transaction.create({
  //       data: {
  //         amount,
  //         reference,
  //         currency,
  //         accountId,
  //         categoryId
  //       },
  //     })
  //   },
  // },
  Account: {
    bank: (parent, _args, context: Context) => {
      return context.prisma.bank
        .findUnique({
          where: { id: parent?.bankId },
        })
    }
  },
  // Transaction: {
  //   account: (parent, _args, context: Context) => {
  //     return context.prisma.account
  //       .findUnique({
  //         where: { id: parent?.accountId },
  //       })
  //   },
  //   category: (parent, _args, context: Context) => {
  //     return context.prisma.category
  //       .findUnique({
  //         where: { id: parent?.categoryId },
  //       })
  //   }
  // }
};

export default resolvers;

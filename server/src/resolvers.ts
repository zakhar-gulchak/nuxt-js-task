import { context, Context } from './context';

import { Resolvers } from './__generated__/graphql';

const resolvers: Resolvers = {
  Query: {
    transactions: (_parent, { offset, limit }) => context.prisma.transaction.findMany({
      skip: offset,
      take: limit,
      include: {
        account: true,
        category: true
      }
    }),
    accounts: () => context.prisma.account.findMany(),
    banks: () => context.prisma.bank.findMany(),
    categories: () => context.prisma.category.findMany(),
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

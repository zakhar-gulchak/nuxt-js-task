import { context, Context } from './context';

import { Resolvers } from './__generated__/graphql';

const resolvers: Resolvers = {
  Query: {
    transactions: () => context.prisma.transaction.findMany(),
    accounts: () => context.prisma.account.findMany(),
    banks: () => context.prisma.account.findMany(),
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
  // Account: {
  //   bank: (parent, _args: { id: number }, context: Context) => {
  //     return context.prisma.account
  //       .findUnique({
  //         where: {id: parent?.id},
  //       })
  //       .bank()
  //   }
  // }
};

export default resolvers;

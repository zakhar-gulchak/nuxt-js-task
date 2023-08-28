"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("./context");
const resolvers = {
    Query: {
        transactions: (_parent, { transactionsInput: { cursorId, limit, sortBy, sortOrder, accountId, search, dateFrom, dateTo } }) => {
            const where = {
                ...(accountId ? { accountId } : {}),
                ...(search ? { reference: { contains: search } } : {}),
                ...(dateFrom ? { date: { gte: new Date(dateFrom) } } : {}),
                ...(dateTo ? { date: { lte: new Date(dateTo) } } : {})
            };
            let orderBy = {};
            if (sortBy === 'category') {
                orderBy = { category: { name: sortOrder } };
            }
            else if (sortBy) {
                orderBy = { [sortBy]: sortOrder };
            }
            return context_1.context.prisma.transaction.findMany({
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
                ...(bankId ? { bankId } : {})
            };
            return context_1.context.prisma.account.findMany({ include: { bank: true }, where });
        },
        banks: () => context_1.context.prisma.bank.findMany(),
        categories: () => context_1.context.prisma.category.findMany(),
        totalTransactionsCount: (_parent, { accountId, search, dateFrom, dateTo }) => {
            const where = {
                ...(accountId ? { accountId } : {}),
                ...(search ? { reference: { contains: search } } : {}),
                ...(dateFrom ? { date: { gte: new Date(dateFrom) } } : {}),
                ...(dateTo ? { date: { lte: new Date(dateTo) } } : {})
            };
            return context_1.context.prisma.transaction.count({ where });
        },
    },
    Account: {
        bank: (parent, _args, context) => {
            return context.prisma.bank
                .findUnique({
                where: { id: parent?.bankId },
            });
        }
    },
};
exports.default = resolvers;

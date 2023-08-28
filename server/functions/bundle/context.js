"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = exports.context = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.context = {
    prisma: prisma,
};
const createContext = async () => ({
    prisma: prisma,
});
exports.createContext = createContext;

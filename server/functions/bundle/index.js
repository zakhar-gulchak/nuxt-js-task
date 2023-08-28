"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const fs_1 = require("fs");
const resolvers_1 = __importDefault(require("./resolvers"));
const context_1 = require("./context");
const start = async () => {
    const server = new server_1.ApolloServer({
        typeDefs: (0, fs_1.readFileSync)('./src/schema/schema.graphql', { encoding: 'utf-8' }),
        resolvers: resolvers_1.default,
        introspection: process.env.NODE_ENV !== 'production'
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        context: context_1.createContext,
        listen: { port: Number(process.env.PORT) || 4000 }
    });
    console.log(`🚀  Server ready at: ${url}`);
};
// start();
const createLambdaServer = () => new server_1.ApolloServer({
    typeDefs: (0, fs_1.readFileSync)('./src/schema/schema.graphql', { encoding: 'utf-8' }),
    resolvers: resolvers_1.default,
    introspection: process.env.NODE_ENV !== 'production'
});
exports.default = { createLambdaServer };

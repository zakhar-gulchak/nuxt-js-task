import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: `http://localhost:${process.env.PORT || 4000}/graphql`,
  generates: {
    "src/__generated__/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-document-nodes"],
      config: {
        enumsAsTypes: true,
        namingConvention: {
          enumValues: "keep",
        },
        mappers: {
          Account: '.prisma/client#Account',
          Bank: '.prisma/client#Bank',
          Transaction: '.prisma/client#Transaction',
        }
      }
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    },
  },
};

export default config;

import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: `http://localhost:${process.env.PORT || 4000}`,
  generates: {
    "src/__generated__/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-document-nodes"]
    },
  }
};

export default config;

import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.EXPO_PUBLIC_API_URL,
  documents: ['**/*.tsx'],
  generates: {
    './__generated__/types.ts': {
      plugins: ['typescript'],
    },
  },

  ignoreNoDocuments: true,
};

export default config;

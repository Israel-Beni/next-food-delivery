import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:1337/graphql',
  documents: ['src/**/*.tsx', 'app/**/*.tsx', 'components/**/*.tsx', 'contexts/**/*tsx'],
  generates: {
    './types/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;
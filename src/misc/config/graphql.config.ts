import { GqlModuleOptions } from '@nestjs/graphql';
import { playgroundQuery } from '../resources/sample.query';
import { join } from 'path';

export const graphqlModuleConfig: GqlModuleOptions = {
  path: 'api/graphql',
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  playground: {
      tabs: [
          {
              endpoint: 'graphql',
              query: playgroundQuery,
              name: "Sample",
              headers: {
                  Authorization: "Bearer TOKEN"
              }
          }
      ]
  }
};

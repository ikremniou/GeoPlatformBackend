import { GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';

export const graphqlModuleConfig: GqlModuleOptions = {
  path: 'api/graphql',
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  playground: {
      tabs: [
          {
              endpoint: 'api/graphql',
              query: 'asdasdasd',
              name: "Sample",
              headers: {
                  Authorization: "Bearer TOKEN"
              }
          }
      ]
  }
};

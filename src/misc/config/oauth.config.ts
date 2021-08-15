import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const oauthSchemeConfig: SecuritySchemeObject = {
  type: 'oauth2',
  scheme: 'bearer',
  bearerFormat: 'jwt',
  flows: {
    password: {
      scopes: {},
      tokenUrl: '/api/auth/local',
    },
  },
};

import {
  MiddlewareConfigProxy,
  ModuleMetadata,
} from '@nestjs/common/interfaces';
import session = require('cookie-session');

export interface NestCookieSessionOptions {
  session: Parameters<typeof session>[0];
  forRoutes?: Parameters<MiddlewareConfigProxy['forRoutes']>;
  exclude?: Parameters<MiddlewareConfigProxy['exclude']>;
}

export const NEST_COOKIE_SESSION_OPTIONS_TOKEN = Symbol(
  'nestjs-cookie-session/options',
);

export interface NestCookieSessionAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => NestCookieSessionOptions | Promise<NestCookieSessionOptions>;
  inject?: any[];
}

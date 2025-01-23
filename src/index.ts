import cookieSession from 'cookie-session';
import {
  AsyncOptions,
  createModule,
  SyncOptions,
} from 'create-nestjs-middleware-module';

interface Options {
  /**
   * cookie-session options. @see https://www.npmjs.com/package/cookie-session#options
   */
  session: Parameters<typeof cookieSession>[0];
}

export type NestCookieSessionOptions = SyncOptions<Options>;

export type NestCookieSessionAsyncOptions = AsyncOptions<Options>;

export const CookieSessionModule = createModule<Options>(({ session }) =>
  cookieSession(session),
);

import cookieSession = require('cookie-session');
import {
  AsyncOptions,
  createModule,
  SyncOptions,
} from 'create-nestjs-middleware-module';

interface Options {
  session: Parameters<typeof cookieSession>[0];
}

export type NestCookieSessionOptions = SyncOptions<Options>;

export type NestCookieSessionAsyncOptions = AsyncOptions<Options>;

export const CookieSessionModule = createModule<Options>(({ session }) =>
  cookieSession(session),
);

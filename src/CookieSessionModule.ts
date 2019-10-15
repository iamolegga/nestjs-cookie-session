import { DynamicModule, Module } from '@nestjs/common';
import { CookieSessionCoreModule } from './CookieSessionCoreModule';
import {
  NestCookieSessionAsyncOptions,
  NestCookieSessionOptions,
} from './options';

@Module({})
export class CookieSessionModule {
  static forRoot(options: NestCookieSessionOptions): DynamicModule {
    return {
      module: CookieSessionModule,
      imports: [CookieSessionCoreModule.forRoot(options)],
    };
  }

  static forRootAsync(options: NestCookieSessionAsyncOptions): DynamicModule {
    return {
      module: CookieSessionModule,
      imports: [CookieSessionCoreModule.forRootAsync(options)],
    };
  }
}

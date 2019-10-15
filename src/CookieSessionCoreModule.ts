import {
  DynamicModule,
  Global,
  Inject,
  MiddlewareConsumer,
  Module,
  Provider,
  RequestMethod,
} from '@nestjs/common';
import cookieSession = require('cookie-session');
import {
  NEST_COOKIE_SESSION_OPTIONS_TOKEN,
  NestCookieSessionAsyncOptions,
  NestCookieSessionOptions,
} from './options';

const defaultRoutes = { path: '*', method: RequestMethod.ALL };

@Global()
@Module({})
export class CookieSessionCoreModule {
  static forRoot(options: NestCookieSessionOptions): DynamicModule {
    const optionsProvider: Provider<NestCookieSessionOptions> = {
      provide: NEST_COOKIE_SESSION_OPTIONS_TOKEN,
      useValue: options,
    };

    return {
      module: CookieSessionCoreModule,
      providers: [optionsProvider],
    };
  }

  static forRootAsync(options: NestCookieSessionAsyncOptions): DynamicModule {
    const optionsProvider: Provider<
      NestCookieSessionOptions | Promise<NestCookieSessionOptions>
    > = {
      provide: NEST_COOKIE_SESSION_OPTIONS_TOKEN,
      useFactory: options.useFactory,
      inject: options.inject,
    };

    return {
      module: CookieSessionCoreModule,
      imports: options.imports,
      providers: [optionsProvider],
    };
  }

  constructor(
    @Inject(NEST_COOKIE_SESSION_OPTIONS_TOKEN)
    private readonly options: NestCookieSessionOptions,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const { exclude, forRoutes, session } = this.options;
    const middleware = cookieSession(session);

    if (forRoutes) {
      consumer.apply(middleware).forRoutes(...forRoutes);
    } else if (exclude) {
      consumer.apply(middleware).exclude(...exclude);
    } else {
      consumer.apply(middleware).forRoutes(defaultRoutes);
    }
  }
}

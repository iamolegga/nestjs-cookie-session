# Nestjs cookie session

Idiomatic Cookie Session Module for NestJS.
Built on top of [cookie-session](https://npm.im/cookie-session) 😎

## Example

Register module:

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { NestCookieSessionOptions, CookieSessionModule } from 'nestjs-cookie-session';
import { ViewsController } from './views.controller';

@Module({
  imports: [

    // sync params:

    CookieSessionModule.forRoot({
      session: { secret: 'keyboard cat' },
    }),

    // or async:

    CookieSessionModule.forRootAsync({
      imports: [ConfigModule],
      inject: [Config],
      //              TIP: to get autocomplete in return object
      //                  add `NestCookieSessionOptions` here ↓↓↓
      useFactory: async (config: Config): Promise<NestCookieSessionOptions> => {
        return {
          session: { secret: config.secret },
        };
      },
    }),
  ],
  controllers: [ViewsController],
})
export class AppModule {}
```

Use in controllers with NestJS built-in `Session` decorator:

```ts
// views.controller.ts
import { Controller, Get, Session } from '@nestjs/common';

@Controller('views')
export class ViewsController {
  @Get()
  getViews(@Session() session: { views?: number }) {
    session.views = (session.views || 0) + 1;
    return session.views;
  }
}
```

To run examples:

```sh
git clone https://github.com/iamolegga/nestjs-cookie-session.git
cd nestjs-cookie-session
npm i
cd example
npm i
npm start
```

## Install

```sh
npm i nestjs-cookie-session
```

or

```sh
yarn add nestjs-cookie-session
```

## API

### CookieSessionModule

`CookieSessionModule` class has two static methods, that returns `DynamicModule`, that you need to import:

- `CookieSessionModule.forRoot` for sync configuration without dependencies
- `CookieSessionModule.forRootAsync` for sync/async configuration with dependencies

### CookieSessionModule.forRoot

Accept `NestCookieSessionOptions`. Returns NestJS `DynamicModule` for import.

### CookieSessionModule.forRootAsync

Accept `NestCookieSessionAsyncOptions`. Returns NestJS `DynamicModule` for import.

### NestCookieSessionOptions

`NestCookieSessionOptions` is interface of all options, has next properties:

- `session` - __required__ - [cookie-session options](https://github.com/expressjs/cookie-session#options).
- `forRoutes` - __optional__ - same as NestJS buil-in `MiddlewareConfigProxy['forRoutes']` [See exmaples in official docs](https://docs.nestjs.com/middleware#applying-middleware). Specify routes, that should have access to session. If `forRoutes` and `exclude` will not be set, then sessions will be set to all routes.
- `exclude` - __optional__ - same as NestJS buil-in `MiddlewareConfigProxy['exclude']` [See exmaples in official docs](https://docs.nestjs.com/middleware#applying-middleware). Specify routes, that should not have access to session. If `forRoutes` and `exclude` will not be set, then sessions will be set to all routes.

### NestCookieSessionAsyncOptions

`NestCookieSessionOptions` is interface of options to create cookie session module, that depends on other modules, has next properties:

- `imports` - __optional__ - modules, that cookie session module depends on. See [official docs](https://docs.nestjs.com/modules).
- `inject` - __optional__ - providers from `imports`-property modules, that will be passed as arguments to `useFactory` method.
- `useFactory` - __required__ - method, that returns `NestCookieSessionOptions`.

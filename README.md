<h1 align="center">nestjs-cookie-session</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/nestjs-cookie-session">
    <img alt="npm" src="https://img.shields.io/npm/v/nestjs-cookie-session" />
  </a>
  <a href="https://www.npmjs.com/package/nestjs-cookie-session">
    <img alt="npm" src="https://img.shields.io/npm/dm/nestjs-cookie-session" />
  </a>
  <a href="https://github.com/iamolegga/nestjs-cookie-session/actions">
    <img alt="GitHub branch checks state" src="https://badgen.net/github/checks/iamolegga/nestjs-cookie-session" />
  </a>
  <a href="https://codeclimate.com/github/iamolegga/nestjs-cookie-session/test_coverage">
    <img src="https://api.codeclimate.com/v1/badges/7edd108bf29b26be86b7/test_coverage" />
  </a>
  <a href="https://snyk.io/test/github/iamolegga/nestjs-cookie-session">
    <img alt="Known Vulnerabilities" src="https://snyk.io/test/github/iamolegga/nestjs-cookie-session/badge.svg" />
  </a>
  <a href="https://libraries.io/npm/nestjs-cookie-session">
    <img alt="Libraries.io" src="https://img.shields.io/librariesio/release/npm/nestjs-cookie-session" />
  </a>
  <img alt="Dependabot" src="https://badgen.net/github/dependabot/iamolegga/nestjs-cookie-session" />
  <img alt="Supported platforms: Express" src="https://img.shields.io/badge/platforms-Express-green" />
</p>

<p align="center">Idiomatic Cookie Session Module for NestJS. Built on top of <a href="https://npm.im/cookie-session">cookie-session</a> 😎</p>

This module implements a session with storing data directly in `Cookie`.

If you want to store data in one of [external stores](https://github.com/expressjs/session#compatible-session-stores) and passing ID of session to client via `Cookie`/`Set-Cookie` headers, you can look at [nestjs-session](https://github.com/iamolegga/nestjs-session).

## Example

Register module:

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import {
  NestCookieSessionOptions,
  CookieSessionModule,
} from 'nestjs-cookie-session';
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
npm run build
cd example
npm i
npm start
```

## Install

```sh
npm i nestjs-cookie-session cookie-session @types/cookie-session
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

`NestCookieSessionOptions` is the interface of all options, has next properties:

- `session` - **required** - [cookie-session options](https://github.com/expressjs/cookie-session#options).
- `forRoutes` - **optional** - same as NestJS built-in `MiddlewareConfigProxy['forRoutes']` [See examples in official docs](https://docs.nestjs.com/middleware#applying-middleware). Specify routes, that should have access to session. If `forRoutes` and `exclude` will not be set, then sessions will be set to all routes.
- `exclude` - **optional** - same as NestJS built-in `MiddlewareConfigProxy['exclude']` [See examples in official docs](https://docs.nestjs.com/middleware#applying-middleware). Specify routes, that should not have access to session. If `forRoutes` and `exclude` will not be set, then sessions will be set to all routes.

### NestCookieSessionAsyncOptions

`NestCookieSessionOptions` is the interface of options to create cookie session module, that depends on other modules, has next properties:

- `imports` - **optional** - modules, that cookie session module depends on. See [official docs](https://docs.nestjs.com/modules).
- `inject` - **optional** - providers from `imports`-property modules, that will be passed as arguments to `useFactory` method.
- `useFactory` - **required** - method, that returns `NestCookieSessionOptions`.

## Migration

### v2

`cookie-session` and `@types/cookie-session` are moved to peer dependencies, so you can update them independently.

<h2 align="center">Do you use this library?<br/>Don't be shy to give it a star! ★</h2>

<h3 align="center">Also if you are into NestJS you might be interested in one of my <a href="https://github.com/iamolegga#nestjs">other NestJS libs</a>.</h3>

<h1 align="center">nestjs-cookie-session</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/nestjs-cookie-session">
    <img alt="npm" src="https://img.shields.io/npm/v/nestjs-cookie-session" />
  </a>
  <a href="https://travis-ci.org/iamolegga/nestjs-cookie-session">
    <img alt="Travis (.org)" src="https://img.shields.io/travis/iamolegga/nestjs-cookie-session" />
  </a>
  <a href="https://coveralls.io/github/iamolegga/nestjs-cookie-session?branch=master">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/iamolegga/nestjs-cookie-session/badge.svg?branch=master" />
  </a>
  <img alt="Supported platforms: Express" src="https://img.shields.io/badge/platforms-Express-green" />
</p>
<p align="center">
  <a href="https://snyk.io/test/github/iamolegga/nestjs-cookie-session">
    <img alt="Snyk Vulnerabilities for npm package" src="https://img.shields.io/snyk/vulnerabilities/npm/nestjs-cookie-session" />
  </a>
  <a href="https://david-dm.org/iamolegga/nestjs-cookie-session">
    <img alt="Dependencies status" src="https://badgen.net/david/dep/iamolegga/nestjs-cookie-session">
  </a>
  <img alt="Dependabot" src="https://badgen.net/dependabot/iamolegga/nestjs-cookie-session/?icon=dependabot">
  <a href="https://codeclimate.com/github/iamolegga/nestjs-cookie-session">
    <img alt="Maintainability" src="https://badgen.net/codeclimate/maintainability/iamolegga/nestjs-cookie-session">
  </a>
</p>

<p align="center">Idiomatic Cookie Session Module for NestJS. Built on top of <a href="https://npm.im/cookie-session">cookie-session</a> 😎</p>

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

- `session` - **required** - [cookie-session options](https://github.com/expressjs/cookie-session#options).
- `forRoutes` - **optional** - same as NestJS buil-in `MiddlewareConfigProxy['forRoutes']` [See exmaples in official docs](https://docs.nestjs.com/middleware#applying-middleware). Specify routes, that should have access to session. If `forRoutes` and `exclude` will not be set, then sessions will be set to all routes.
- `exclude` - **optional** - same as NestJS buil-in `MiddlewareConfigProxy['exclude']` [See exmaples in official docs](https://docs.nestjs.com/middleware#applying-middleware). Specify routes, that should not have access to session. If `forRoutes` and `exclude` will not be set, then sessions will be set to all routes.

### NestCookieSessionAsyncOptions

`NestCookieSessionOptions` is interface of options to create cookie session module, that depends on other modules, has next properties:

- `imports` - **optional** - modules, that cookie session module depends on. See [official docs](https://docs.nestjs.com/modules).
- `inject` - **optional** - providers from `imports`-property modules, that will be passed as arguments to `useFactory` method.
- `useFactory` - **required** - method, that returns `NestCookieSessionOptions`.

<h2 align="center">Do you use this library?<br/>Don't be shy to give it a star! ★</h2>

Also if you are into NestJS ecosystem you may be interested in one of my other libs:

[nestjs-pino](https://github.com/iamolegga/nestjs-pino)

[![GitHub stars](https://img.shields.io/github/stars/iamolegga/nestjs-pino?style=flat-square)](https://github.com/iamolegga/nestjs-pino)
[![npm](https://img.shields.io/npm/dm/nestjs-pino?style=flat-square)](https://www.npmjs.com/package/nestjs-pino)

Platform agnostic logger for NestJS based on [pino](http://getpino.io/) with request context in every log

---

[nestjs-session](https://github.com/iamolegga/nestjs-session)

[![GitHub stars](https://img.shields.io/github/stars/iamolegga/nestjs-session?style=flat-square)](https://github.com/iamolegga/nestjs-session)
[![npm](https://img.shields.io/npm/dm/nestjs-session?style=flat-square)](https://www.npmjs.com/package/nestjs-session)

Idiomatic session module for NestJS. Built on top of [express-session](https://www.npmjs.com/package/express-session)

---

[nestjs-cookie-session](https://github.com/iamolegga/nestjs-cookie-session)

[![GitHub stars](https://img.shields.io/github/stars/iamolegga/nestjs-cookie-session?style=flat-square)](https://github.com/iamolegga/nestjs-cookie-session)
[![npm](https://img.shields.io/npm/dm/nestjs-cookie-session?style=flat-square)](https://www.npmjs.com/package/nestjs-cookie-session)

Idiomatic cookie session module for NestJS. Built on top of [cookie-session](https://www.npmjs.com/package/cookie-session)

---

[nestjs-roles](https://github.com/iamolegga/nestjs-roles)

[![GitHub stars](https://img.shields.io/github/stars/iamolegga/nestjs-roles?style=flat-square)](https://github.com/iamolegga/nestjs-roles)
[![npm](https://img.shields.io/npm/dm/nestjs-roles?style=flat-square)](https://www.npmjs.com/package/nestjs-roles)

Type safe roles guard and decorator made easy

---

[nest-ratelimiter](https://github.com/iamolegga/nestjs-ratelimiter)

[![GitHub stars](https://img.shields.io/github/stars/iamolegga/nestjs-ratelimiter?style=flat-square)](https://github.com/iamolegga/nestjs-ratelimiter)
[![npm](https://img.shields.io/npm/dm/nest-ratelimiter?style=flat-square)](https://www.npmjs.com/package/nest-ratelimiter)

Distributed consistent flexible NestJS rate limiter based on Redis

---

[create-nestjs-middleware-module](https://github.com/iamolegga/create-nestjs-middleware-module)

[![GitHub stars](https://img.shields.io/github/stars/iamolegga/create-nestjs-middleware-module?style=flat-square)](https://github.com/iamolegga/create-nestjs-middleware-module)
[![npm](https://img.shields.io/npm/dm/create-nestjs-middleware-module?style=flat-square)](https://www.npmjs.com/package/create-nestjs-middleware-module)

Create simple idiomatic NestJS module based on Express/Fastify middleware in just a few lines of code with routing out of the box

---

[nestjs-configure-after](https://github.com/iamolegga/nestjs-configure-after)

[![GitHub stars](https://img.shields.io/github/stars/iamolegga/nestjs-configure-after?style=flat-square)](https://github.com/iamolegga/nestjs-configure-after)
[![npm](https://img.shields.io/npm/dm/nestjs-configure-after?style=flat-square)](https://www.npmjs.com/package/nestjs-configure-after)

Declarative configuration of NestJS middleware order

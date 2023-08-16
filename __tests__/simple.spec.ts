import { Controller, Get, Module, Session } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { CookieSessionModule } from '../src';

import { platforms } from './utils/platforms';
import { doubleRequest } from './utils/request';

describe(CookieSessionModule.forRoot.name, () => {
  for (const PlatformAdapter of platforms) {
    describe(PlatformAdapter.name, () => {
      it('works', async () => {
        @Controller('/')
        class TestController {
          @Get()
          get(@Session() session?: { views?: number }) {
            if (!session) {
              return { views: 0 };
            }

            session.views = (session.views || 0) + 1;
            return { views: session.views };
          }
        }

        // tslint:disable-next-line max-classes-per-file
        @Module({
          imports: [
            CookieSessionModule.forRoot({ session: { secret: 'test' } }),
          ],
          controllers: [TestController],
        })
        class TestModule {}

        const app = await NestFactory.create(
          TestModule,
          new PlatformAdapter(),
          { logger: false },
        );
        const server = app.getHttpServer();

        await app.init();
        const [res1, res2] = await doubleRequest(server);
        await app.close();

        expect(res1.body.views).toBe(1);
        expect(res2.body.views).toBe(2);
      });
    });
  }
});

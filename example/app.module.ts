import { Module } from '@nestjs/common';
import { CookieSessionModule } from '../';
import { AppController } from './app.controller';

@Module({
  imports: [CookieSessionModule.forRoot({ session: { secret: 'qwerty' } })],
  controllers: [AppController],
})
export class AppModule {}

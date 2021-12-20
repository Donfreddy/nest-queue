import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MessageConsumer } from './message.consumer';
import { MessageProducerService } from './message.producer.service';
import { MailModule } from './mail/mail.module';

require('dotenv');

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
    BullModule.registerQueue({ name: 'message-queue' }, { name: 'mailsend' }),
    MailModule,
  ],
  controllers: [AppController],
  providers: [MessageProducerService, MessageConsumer],
})
export class AppModule {}

import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

export interface User {
  email: string;
}

@Injectable()
export class MailService {
  constructor(
    @InjectQueue('mailsend')
    private mailQueue: Queue,
    private readonly mailerService: MailerService,
  ) {}

  public async sendMail() {
    this.mailerService
      .sendMail({
        to: 'jwyoon1@lunasoft.co.kr',
        from: 'jwy9724@gmail.com',
        subject: 'Testing Nest MailerModule',
        text: 'welcome',
        html: '<b>welcome</b>', // HTML body content
      })
      .then((success) => {
        console.log(success, 'Mail sent successfully.');
        return success;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /** Send email confirmation link to new user account. */
  async sendConfirmationEmail(user: User, code: string): Promise<boolean> {
    try {
      await this.mailQueue.add('confirmation', {
        user,
        code,
      });
      return true;
    } catch (error) {
      console.log('Error queueing confirmation email to user.');
      return false;
    }
  }
}

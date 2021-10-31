import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interfaces';
import got from 'got';
import * as FormData from 'form-data';

@Injectable()
export class MailService {
  constructor(@Inject(CONFIG_OPTIONS) private options: MailModuleOptions) {}

  async sendEmail(subject: string, template: string, emailVars: EmailVar[]) {
    try {
      const form = new FormData();
      form.append(
        'from',
        `Hoon from Huber Eats <mailgun@${this.options.domain}>`,
      );
      form.append('to', 'didc1461@gmail.com');
      form.append('subject', subject);
      form.append('template', template);
      emailVars.forEach((eVar) => form.append(`v:${eVar.key}`, eVar.value));

      const response = await got(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization:
              'Basic ' +
              Buffer.from(`api:${this.options.apiKey}`).toString('base64'),
          },
          body: form,
        },
      );
      console.log(response.body);
    } catch (e) {
      console.log(e);
    }
  }

  async sendVerificationEmail(email: string, code: string) {
    try {
      this.sendEmail('Verify your Email', 'verify-email', [
        {
          key: 'username',
          value: email,
        },
        {
          key: 'code',
          value: code,
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  }
}

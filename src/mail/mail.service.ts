import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interfaces';
import got from 'got';
import * as FormData from 'form-data';

@Injectable()
export class MailService {
  constructor(@Inject(CONFIG_OPTIONS) private options: MailModuleOptions) {
    this.sendEmail('testing', 'test')
      .then(() => console.log('success'))
      .catch((err) => console.log(err));
  }

  async sendEmail(subject: string, content: string) {
    try {
      const form = new FormData();
      form.append('from', `Excited User <mailgun@${this.options.domain}>`);
      form.append('to', 'didwogns789@yonsei.ac.kr');
      form.append('subject', subject);
      form.append('text', content);

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
    } catch (e) {
      console.log(e);
    }
  }
}

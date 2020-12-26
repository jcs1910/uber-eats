import got from 'got';
import * as FormData from 'form-data';

import { Injectable, Inject } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constant';
import { MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {
    this.sendEmail('testing', 'test');
  }
  private async sendEmail(subject: string, template: string) {
    const form = new FormData();
    form.append('from', `mailgun@${this.options.domain}`);
    form.append('to', `jcs191072@gmail.com`);
    form.append('subject', subject);
    form.append('template', template);
    form.append('v:code', 'ahaghfdsg');
    form.append('v:username', 'jarry!');

    const response = await got(
      `https://api.mailgun.net/v3/${this.options.domain}/messages`,
      {
        https: {
          rejectUnauthorized: false,
        },
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      },
    );
    console.log('response', response.body);
  }
}

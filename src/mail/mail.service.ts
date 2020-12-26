import got from 'got';
import * as FormData from 'form-data';

import { Injectable, Inject } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constant';
import { MailModuleOptions, EmailVariables } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  private async sendEmail(
    subject: string,
    template: string,
    emailVariables: EmailVariables[],
  ): Promise<boolean> {
    console.log('emailVariables ', emailVariables);
    const form = new FormData();
    form.append(
      'from',
      `This is made by Chang-suk from Uber Eats mailgun@${this.options.domain}`,
    );
    form.append('to', `jcs191072@gmail.com`);
    form.append('subject', subject);
    form.append('template', template);

    emailVariables.forEach(emailVariable =>
      form.append(`v:${emailVariable.key}`, emailVariable.value),
    );

    console.log('form', form);
    try {
      const result = await got.post(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        {
          https: {
            rejectUnauthorized: false,
          },
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        },
      );
      console.log('result', result);
      return true;
    } catch (error) {
      return false;
    }
  }

  public sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', 'verify-email', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}

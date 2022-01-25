import { Injectable } from '@nestjs/common';
import { StringUtils } from '../utils/string-utils';
import { messages } from './message.ru';

export type i18nKeyType = keyof typeof messages;

@Injectable()
export class I18nService {
  public get(key: i18nKeyType, ...args: any[]): string {
    return StringUtils.format(messages[key], ...args);
  }
}

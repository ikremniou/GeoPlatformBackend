import { Injectable } from '@nestjs/common';
import { messages } from './message.ru';

export type i18nKeyType = keyof typeof messages;

@Injectable()
export class I18nService {
    public get(key: i18nKeyType): string {
        return messages[key];
    }
}

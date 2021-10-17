import { Injectable } from '@nestjs/common';
import { messages } from './message.ru';

type keyType = keyof typeof messages;

@Injectable()
export class I18nService {
    public get(key: keyType): string {
        return messages[key];
    }
}

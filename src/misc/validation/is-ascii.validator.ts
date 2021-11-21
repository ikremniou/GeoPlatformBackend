import { Injectable } from '@nestjs/common';
import { isAscii, ValidationArguments, ValidatorConstraint } from 'class-validator';
import { I18nService } from '../locale/i18n.service';
import { BaseValidator } from './base.validator';

@Injectable()
@ValidatorConstraint()
export class IsAsciiValidator extends BaseValidator {
  constructor(i18n: I18nService) {
    super(i18n);
  }

  public validate(value: any): boolean | Promise<boolean> {
    return isAscii(value);
  }

  public defaultMessage?(validationArguments?: ValidationArguments): string {
    return this.format('Validation_NotAscii', validationArguments.property);
  }
}

import { Injectable } from '@nestjs/common';
import { length, ValidationArguments, ValidatorConstraint } from 'class-validator';
import { I18nService } from '../locale/i18n.service';
import { BaseValidator } from './base.validator';

@Injectable()
@ValidatorConstraint()
export class LengthValidator extends BaseValidator {
  constructor(i18n: I18nService) {
    super(i18n);
  }

  public validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    const minLength = validationArguments.constraints[0];
    const maxLength = validationArguments.constraints[1];

    return length(value, minLength, maxLength);
  }

  public defaultMessage?(validationArguments?: ValidationArguments): string {
    const minLength = validationArguments.constraints[0];
    const maxLength = validationArguments.constraints[1];
    return this.format('Validation_Length', validationArguments.property, minLength, maxLength);
  }
}

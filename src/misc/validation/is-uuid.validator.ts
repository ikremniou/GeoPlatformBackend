import { Injectable } from '@nestjs/common';
import { isUUID, ValidationArguments, ValidatorConstraint } from 'class-validator';
import { I18nService } from '../locale/i18n.service';
import { BaseValidator } from './base.validator';

@Injectable()
@ValidatorConstraint()
export class IsUUIDValidator extends BaseValidator {
  constructor(i18n: I18nService) {
    super(i18n);
  }

  public validate(value: any, validationArguments: ValidationArguments): boolean | Promise<boolean> {
    return isUUID(value, validationArguments?.constraints[0]);
  }

  public defaultMessage?(validationArguments?: ValidationArguments): string {
    return this.format('Validation_NotUUID', validationArguments.property, validationArguments?.constraints[0]);
  }
}

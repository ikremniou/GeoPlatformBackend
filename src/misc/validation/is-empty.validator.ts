import { Injectable } from '@nestjs/common';
import { isNotEmpty, ValidationArguments, ValidatorConstraint } from 'class-validator';
import { I18nService } from '../locale/i18n.service';
import { BaseValidator } from './base.validator';

@Injectable()
@ValidatorConstraint()
export class IsEmptyValidator extends BaseValidator {
  constructor(i18n: I18nService) {
    super(i18n);
  }

  public validate(value: any): Promise<boolean> | boolean {
    return isNotEmpty(value);
  }

  public defaultMessage(validationArguments?: ValidationArguments): string {
    return this.format('Validation_IsEmptyField', validationArguments.property);
  }
}

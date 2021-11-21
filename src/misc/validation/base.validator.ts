import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { i18nKeyType, I18nService } from '../locale/i18n.service';
import { StringUtils } from '../utils/string-utils';

@Injectable()
@ValidatorConstraint()
export abstract class BaseValidator implements ValidatorConstraintInterface {
  constructor(private readonly _i18n: I18nService) {}

  abstract validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
  abstract defaultMessage?(validationArguments?: ValidationArguments): string;

  protected format(error: i18nKeyType, property: string, ...args: any[]) {
    const propertyKey = `ClassProperty_${property}` as i18nKeyType;
    return StringUtils.format(this._i18n.get(error), this._i18n.get(propertyKey), ...args);
  }
}

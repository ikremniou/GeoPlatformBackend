import { Module } from '@nestjs/common';
import { LocaleModule } from '../locale/locale.module';
import { IsAsciiValidator } from './is-ascii.validator';
import { IsEmailValidator } from './is-email.validator';
import { IsUUIDValidator } from './is-uuid.validator';
import { LengthValidator } from './length.validator';
import { IsEmptyValidator } from './is-empty.validator';

@Module({
  imports: [LocaleModule],
  exports: [IsEmptyValidator, LengthValidator],
  providers: [IsEmptyValidator, LengthValidator, IsUUIDValidator, IsEmailValidator, IsAsciiValidator],
})
export class ValidationModule {}

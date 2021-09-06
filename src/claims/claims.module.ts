import { Module } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { PolicyModule } from 'src/auth/policy/policy.module';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [PolicyModule, DataModule],
  controllers: [ClaimsController],
  providers: [ClaimsService]
})
export class ClaimsModule {}

import { Module } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Claim } from './entities/claim.entity';
import { PolicyModule } from 'src/auth/policy/policy.module';

@Module({
  imports: [TypeOrmModule.forFeature([Claim]), PolicyModule],
  controllers: [ClaimsController],
  providers: [ClaimsService]
})
export class ClaimsModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { ClaimsModule } from './claims/claims.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt/jwt.guard';
import { PolicyModule } from './auth/policy/policy.module';
import { InviteModule } from './invite/invite.module';
import { WorkerModule } from './worker/worker.module';
import { GraphQLModule } from '@nestjs/graphql';
import { graphqlModuleConfig } from './misc/config/graphql.config';
import { DataModule } from './data/data.module';
import { ProjectResolver } from './project/project.resolver';
import { ProjectModule } from './project/project.module';
import { ActivityModule } from './activity/activity.module';
import { TimeReportModule } from './time-report/time-report.module';
import { MonthlyTimeReviewModule } from './monthly-time-review/monthly-time-review.module';
import { MonthlyTimeReviewModule } from './monthly-time-review/monthly-time-review.module';

@Module({
  imports: [
    GraphQLModule.forRoot(graphqlModuleConfig),
    UsersModule,
    AuthModule,
    RolesModule,
    ClaimsModule,
    PolicyModule,
    InviteModule,
    WorkerModule,
    DataModule,
    ProjectModule,
    ActivityModule,
    TimeReportModule,
    MonthlyTimeReviewModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ProjectResolver,
  ],
})
export class AppModule {}

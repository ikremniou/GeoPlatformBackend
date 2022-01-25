import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { DataModule } from 'src/data/data.module';
import { PolicyModule } from 'src/auth/policy/policy.module';

@Module({
  imports: [DataModule, PolicyModule],
  providers: [ProjectResolver, ProjectService]
})
export class ProjectModule {}

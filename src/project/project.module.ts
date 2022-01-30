import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { DataModule } from 'src/data/data.module';
import { PolicyModule } from 'src/auth/policy/policy.module';
import { LocaleModule } from 'src/misc/locale/locale.module';

@Module({
  imports: [DataModule, PolicyModule, LocaleModule],
  providers: [ProjectResolver, ProjectService]
})
export class ProjectModule {}

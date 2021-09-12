import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [DataModule],
  providers: [ProjectResolver, ProjectService]
})
export class ProjectModule {}

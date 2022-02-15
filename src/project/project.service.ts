import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/data/prisma.service';
import { ServerBusinessError } from 'src/misc/error/server-business.error';
import { I18nService } from 'src/misc/locale/i18n.service';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(private readonly _i18n: I18nService, private readonly _prisma: PrismaService) {}
  public async create(createProjectInput: CreateProjectInput): Promise<Project> {
    await this.validateUniqueSummary(createProjectInput.summary);
    const createdProject = await this._prisma.project.create({ data: createProjectInput });
    return plainToClass(Project, createdProject);
  }

  public async findAll(filter?: any, skip?: number, take?: number): Promise<Project[]> {
    const projects = await this._prisma.project.findMany({ where: filter, skip, take });
    return plainToClass(Project, projects);
  }

  public async findOne(id: number): Promise<Project> {
    const project = await this._prisma.project.findFirst({ where: { id } });
    return plainToClass(Project, project);
  }

  public async update(id: number, updateProjectInput: UpdateProjectInput): Promise<Project> {
    await Promise.all([this.validateId(id), this.validateUniqueSummary(updateProjectInput.summary, id)]);
    const updatedProject = await this._prisma.project.update({ where: { id }, data: updateProjectInput });
    return plainToClass(Project, updatedProject);
  }

  public async remove(id: number): Promise<Project> {
    await this.validateId(id);
    const removedProject = await this._prisma.project.delete({ where: { id } });
    return plainToClass(Project, removedProject);
  }

  private async validateId(id: number): Promise<void> {
    if (!(await this._prisma.project.findUnique({ where: { id } }))) {
      throw new ServerBusinessError(this._i18n.get('Project_InvalidId', id));
    }
  }

  private async validateUniqueSummary(summary?: string, id?: number): Promise<void> {
    if (!summary) {
      return;
    }

    const project = await this._prisma.project.findUnique({ where: { summary } });
    if (project) {
      if (!id || project.id !== id) {
        throw new ServerBusinessError(this._i18n.get('Project_SummaryIsNotUnique', summary));
      }
    }
  }
}

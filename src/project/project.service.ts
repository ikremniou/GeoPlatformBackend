import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/data/prisma.service';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(private readonly _prisma: PrismaService) {
  }
  public async create(createProjectInput: CreateProjectInput): Promise<Project> {
    const createdProject = await this._prisma.project.create({ data: createProjectInput });
    return plainToClass(Project, createdProject);
  }

  public async findAll(): Promise<Project[]> {
    const projects = await this._prisma.project.findMany();
    return plainToClass(Project, projects);
  }

  public async findOne(id: number): Promise<Project> {
    const project = await this._prisma.project.findFirst({ where: { id }});
    return plainToClass(Project, project);
  }

  public async update(id: number, updateProjectInput: UpdateProjectInput): Promise<Project> {
    const updatedProject = await this._prisma.project.update({ where: { id }, data: updateProjectInput });
    return plainToClass(Project, updatedProject);
  }

  public async remove(id: number): Promise<Project> {
    const removedProject = await this._prisma.project.delete({ where: { id }});
    return plainToClass(Project, removedProject);
  }
}

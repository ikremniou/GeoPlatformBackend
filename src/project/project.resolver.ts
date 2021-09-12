import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { PublicRoute } from 'src/misc/decorators/public-path.decorator';

@PublicRoute()
@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => Project)
  public createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput): Promise<Project> {
    return this.projectService.create(createProjectInput);
  }

  @Query(() => [Project], { name: 'projects' })
  public findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Query(() => Project, { name: 'project' })
  public findOne(@Args('id', { type: () => Int }) id: number): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @Mutation(() => Project)
  public updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput): Promise<Project> {
    return this.projectService.update(updateProjectInput.id, updateProjectInput);
  }

  @Mutation(() => Project)
  public removeProject(@Args('id', { type: () => Int }) id: number): Promise<Project> {
    return this.projectService.remove(id);
  }
}

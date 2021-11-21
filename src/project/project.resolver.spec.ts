import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

describe('ProjectResolver', () => {
  let resolver: ProjectResolver;
  const projectServiceMock = mock<ProjectService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectResolver,
        {
          provide: ProjectService,
          useValue: projectServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<ProjectResolver>(ProjectResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

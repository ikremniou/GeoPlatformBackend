import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { PrismaService } from 'src/data/prisma.service';
import { I18nService } from 'src/misc/locale/i18n.service';
import { InviteService } from './invite.service';

describe('InviteService', () => {
  let service: InviteService;
  const prismaMock = mock<PrismaService>();
  const i18nServiceMock = mock<I18nService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InviteService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: I18nService,
          useValue: i18nServiceMock,
        },
      ],
    }).compile();

    service = module.get<InviteService>(InviteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

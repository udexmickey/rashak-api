import { Test, TestingModule } from '@nestjs/testing';
import { TeamMemberController } from '../teammember.controller';
import { TeamMemberService } from '../teammember.service';

describe('TeamMemberController', () => {
  let controller: TeamMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamMemberController],
      providers: [TeamMemberService],
    }).compile();

    controller = module.get<TeamMemberController>(TeamMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

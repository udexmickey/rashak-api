import { Test, TestingModule } from '@nestjs/testing';
import { BoardmembersController } from './boardmembers.controller';
import { BoardmembersService } from './boardmembers.service';

describe('BoardmembersController', () => {
  let controller: BoardmembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardmembersController],
      providers: [BoardmembersService],
    }).compile();

    controller = module.get<BoardmembersController>(BoardmembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

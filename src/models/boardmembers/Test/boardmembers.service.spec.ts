import { Test, TestingModule } from '@nestjs/testing';
import { BoardmembersService } from './boardmembers.service';

describe('BoardmembersService', () => {
  let service: BoardmembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardmembersService],
    }).compile();

    service = module.get<BoardmembersService>(BoardmembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

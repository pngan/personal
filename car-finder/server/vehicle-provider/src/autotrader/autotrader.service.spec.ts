import { Test, TestingModule } from '@nestjs/testing';
import { AutotraderService } from './autotrader.service';

describe('AutotraderService', () => {
  let service: AutotraderService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutotraderService],
    }).compile();
    service = module.get<AutotraderService>(AutotraderService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

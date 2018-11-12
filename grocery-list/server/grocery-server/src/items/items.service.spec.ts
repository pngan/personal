import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';

describe('ItemService', () => {
  let service: ItemsService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService],
    }).compile();
    service = module.get<ItemsService>(ItemsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

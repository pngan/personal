import { Test, TestingModule } from '@nestjs/testing';
import { AutotraderController } from './autotrader.controller';

describe('Autotrader Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AutotraderController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AutotraderController = module.get<AutotraderController>(AutotraderController);
    expect(controller).toBeDefined();
  });
});

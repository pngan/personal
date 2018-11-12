import { Get, Post, Body, Controller } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './create-item-dto';
import { ItemDto } from './item-dto';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    async root(): Promise<ItemDto[]> {
      return await this.itemsService.getAll();
    }

    @Post()
    async create(@Body() createItemDto: CreateItemDto): Promise<boolean> {
      return await this.itemsService.create(createItemDto);
    }
}

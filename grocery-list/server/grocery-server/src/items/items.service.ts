import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateItemDto } from './create-item-dto';
import { DynamoDB } from 'aws-sdk';
import { v1 } from 'uuid';
import { ItemDto } from './item-dto';

@Injectable()
export class ItemsService implements OnModuleInit {
  onModuleInit() {
    this.dbClient = new DynamoDB.DocumentClient();
  }
  dbClient: DynamoDB.DocumentClient;
  logger: Logger;

  async create(createItemDto: CreateItemDto): Promise<boolean> {

    Logger.log(`itemName = ${createItemDto.itemName}`, 'ItemsService');
    const params = {
      TableName: 'grocery-item',
      Item: {
        itemId: v1(),
        itemName: createItemDto.itemName,
      },
    };

    const result = await this.dbClient.put(params).promise();
    if (result.$response.error) {
      Logger.error(result.$response.error, 'ItemsService/create');
      return null;
    }
    return true;
  }

  async getAll(): Promise<ItemDto[]> {
    const params = {
      TableName: 'grocery-item',
    };
    const scanOutput = await this.dbClient.scan(params).promise();
    if (scanOutput.$response.error) {
      Logger.error(scanOutput.$response.error, 'ItemsService/getAll');
      return null;
    }

    Logger.log(`Successfully retrieved ${scanOutput.Count} items from database`, 'ItemsService/getAll');
    return scanOutput.Items.map(item => item as ItemDto);
  }
}

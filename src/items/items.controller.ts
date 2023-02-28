import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Public } from '../common/decorators';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Items } from '../schemas/items.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get('collection/:id')
  @Public()
  @ApiOperation({ summary: 'Get items for collection' })
  @ApiResponse({ status: 200, type: [Items] })
  @HttpCode(HttpStatus.OK)
  async getCollectionItems(
    @Param('id') id: string,
    @Query() query: ExpressQuery,
  ) {
    return await this.itemsService.getCollectionItems(query, id);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get item' })
  @ApiResponse({ status: 200, type: Items })
  @HttpCode(HttpStatus.OK)
  async getItem(@Param('id') id: string) {
    return await this.itemsService.getItemById(id);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get items from search' })
  @ApiResponse({ status: 200, type: [Items] })
  @HttpCode(HttpStatus.OK)
  async getSearchItems(@Query() query: ExpressQuery) {
    return await this.itemsService.getFullTextSearchItems(query);
  }

  @Post('last')
  @Public()
  @ApiOperation({ summary: 'Get last added items' })
  @ApiResponse({ status: 200, type: [Items] })
  @HttpCode(HttpStatus.OK)
  async getLastItems() {
    return await this.itemsService.getLastAddedItems();
  }


  @Post()
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({ status: 200, type: Items })
  @HttpCode(HttpStatus.OK)
  async createCollection(@Body() dto: CreateItemDto) {
    return await this.itemsService.createItem(dto);
  }

  @Post('tags')
  @Public()
  @ApiOperation({ summary: 'Find item by tag' })
  @ApiResponse({ status: 200, type: [Items] })
  @HttpCode(HttpStatus.OK)
  async findByTags(@Body() { tags }: { tags: string[] }) {
    return await this.itemsService.findItemsByTags(tags);
  }

  @Post('like')
  @ApiOperation({ summary: 'Like item' })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  async likeItem(
    @Body() { userId, itemId }: { userId: string; itemId: string },
  ) {
    return await this.itemsService.likeItem(userId, itemId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit item' })
  @ApiResponse({ status: 200, type: Items })
  @HttpCode(HttpStatus.OK)
  async editCollection(@Param('id') id: string, @Body() dto: UpdateItemDto) {
    return await this.itemsService.updateItem(dto, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete collection' })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  async deleteCollection(@Param('id') id: string) {
    return await this.itemsService.deleteItem(id);
  }
}

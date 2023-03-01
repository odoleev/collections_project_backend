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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CollectionsService } from './collections.service';
import { Collection } from '../schemas/collections.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Public } from '../common/decorators';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@ApiTags('Collections')
@Controller('collections')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get collection by id' })
  @ApiResponse({ status: 200, type: Collection })
  @HttpCode(HttpStatus.OK)
  async getCollectionById(@Param('id') id: string) {
    return await this.collectionsService.getCollectionById(id);
  }

  @Get('user-collections/:id')
  @Public()
  @ApiOperation({ summary: 'Get collections of user' })
  @ApiResponse({ status: 200, type: [Collection] })
  @HttpCode(HttpStatus.OK)
  async getUserCollections(
    @Param('id') id: string,
    @Query() query: ExpressQuery,
  ) {
    return await this.collectionsService.getUserCollections(query, id);
  }

  @Get('')
  @Public()
  @ApiOperation({ summary: 'Get collection with most items' })
  @ApiResponse({ status: 200, type: [Collection] })
  @HttpCode(HttpStatus.OK)
  async getMostItemsCollections() {
    return await this.collectionsService.getCollectionsWithMostItems();
  }

  @Post()
  @ApiOperation({ summary: 'Create collection' })
  @ApiResponse({ status: 200, type: Collection })
  @HttpCode(HttpStatus.OK)
  async createCollection(@Body() dto: CreateCollectionDto) {
    return await this.collectionsService.createCollection(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit collection' })
  @ApiResponse({ status: 200, type: Collection })
  @HttpCode(HttpStatus.OK)
  async editCollection(
    @Param('id') id: string,
    @Body() dto: UpdateCollectionDto,
  ) {
    return await this.collectionsService.updateCollection(dto, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete collection' })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  async deleteCollection(@Param('id') id: string) {
    return await this.collectionsService.deleteCollection(id);
  }
}

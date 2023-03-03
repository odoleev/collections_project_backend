import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Items, ItemsDocument } from '../schemas/items.schema';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { CollectionsService } from '../collections/collections.service';
import { UpdateItemDto } from './dto/update-item.dto';
import { Query } from 'express-serve-static-core';
import { returnQuery } from '../helpers/returnQuery';
import {
  itemsPipeline,
  itemsPipelineCollection,
} from '../common/pipelines/items';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Items.name) private itemsModel: Model<ItemsDocument>,
    private collectionsService: CollectionsService,
  ) {}

  async getCollectionItems(query: Query, collectionId: string) {
    const [search, sortBy, currentLimit, skip] = returnQuery(
      query,
      'createdAt',
    );
    if (search) {
      const items = await this.itemsModel
        .aggregate(itemsPipelineCollection(search, collectionId))
        .sort(sortBy)
        .limit(currentLimit)
        .skip(skip);
      const [totalCount] = await this.itemsModel
        .aggregate(itemsPipelineCollection(search, collectionId))
        .count('totalCount');
      return { items, totalCount };
    } else {
      const items = await this.itemsModel
        .find({ collectionId: collectionId })
        .sort(sortBy)
        .limit(currentLimit)
        .skip(skip);
      const totalCount = await this.itemsModel
        .find({ collectionId: collectionId })
        .count();
      return { items, totalCount: { totalCount } };
    }
  }

  async getFullTextSearchItems(query: Query) {
    const [search, sortBy, currentLimit, skip] = returnQuery(
      query,
      'createdAt',
    );
    if (search) {
      const items = await this.itemsModel
        .aggregate(itemsPipeline(search))
        .sort(sortBy)
        .limit(currentLimit)
        .skip(skip);
      const [totalCount] = await this.itemsModel
        .aggregate(itemsPipeline(search))
        .count('totalCount');
      return { items, totalCount };
    }
    return [];
  }

  async getLastAddedItems() {
    const items = await this.itemsModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(6);
    return { items, totalCount: { totalCount: 6 } };
  }

  async findItemsByTags(tags: string[], query: Query) {
    const [search, sortBy, currentLimit, skip] = returnQuery(
      query,
      'createdAt',
    );
    const items = await this.itemsModel
      .find({ tags: { $all: tags } })
      .sort(sortBy)
      .limit(currentLimit)
      .skip(skip);
    const totalCount = await this.itemsModel
      .find({ tags: { $all: tags } })
      .count();
    return { items, totalCount: { totalCount } };
  }

  async createItem(dto: CreateItemDto) {
    const collection = await this.collectionsService.getCollectionById(
      dto.collectionId,
    );
    await this.collectionsService.itemsInCollectionPlus(dto.collectionId);
    const item = new this.itemsModel({
      ...dto,
      createdAt: new Date(),
      collectionName: collection.name,
      creatorId: collection.creatorId,
    });
    return item.save();
  }

  async updateItem(updateDto: UpdateItemDto, id: string) {
    await this.itemsModel.updateOne(
      { _id: id },
      {
        $set: {
          ...updateDto,
        },
      },
    );
    return this.getItemById(id);
  }

  async deleteItem(id: string) {
    const item = await this.getItemById(id);
    await this.collectionsService.itemsInCollectionMinus(item.collectionId);
    await this.itemsModel.deleteOne({ _id: id });
  }

  async getTags() {
    const tags = await this.itemsModel.find({}, { tags: 1, _id: 0 });
    const allTags = [];
    tags.map((innerTags) => {
      innerTags.tags.map((tag) => {
        allTags.push(tag);
      });
    });
    const cloud = allTags.reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {});
    return cloud;
  }

  async getItemById(id: string) {
    const item = await this.itemsModel.findById(id);
    return item;
  }

  async likeItem(userId: string, itemId: string) {
    const item = await this.getItemById(itemId);
    const isLiked = item.likesUsers.includes(userId);
    const likes = item.likesUsers;
    likes.push(userId);
    if (!isLiked) {
      await this.itemsModel.updateOne(
        { _id: itemId },
        {
          $set: {
            likesUsers: likes,
          },
        },
      );
    }
  }
}

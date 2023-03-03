import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collection, CollectionsDocument } from '../schemas/collections.schema';
import { Model } from 'mongoose';
import { Query } from 'express-serve-static-core';
import { returnQuery } from '../helpers/returnQuery';
import { UsersService } from '../users/users.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { collectionsPipeline } from '../common/pipelines';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel(Collection.name)
    private collectionsModel: Model<CollectionsDocument>,
    private usersService: UsersService,
  ) {}

  async createCollection(dto: CreateCollectionDto) {
    const user = await this.usersService.getUserById(dto.creatorId);
    const collection = new this.collectionsModel({
      ...dto,
      createdAt: new Date(),
      creatorUsername: user.username,
    });
    return collection.save();
  }

  async getCollectionById(id: string) {
    const collection = await this.collectionsModel.findById(id);
    return collection;
  }

  async getUserCollections(query: Query, userId: string) {
    const [search, sortBy, currentLimit, skip] = returnQuery(
      query,
      'createdAt',
    );
    if (search) {
      const collections = await this.collectionsModel
        .aggregate(collectionsPipeline(search, userId))
        .sort(sortBy)
        .limit(currentLimit)
        .skip(skip);
      const [totalCount] = await this.collectionsModel
        .aggregate(collectionsPipeline(search, userId))
        .count('totalCount');
      return { collections, totalCount };
    } else {
      const collections = await this.collectionsModel
        .find({ creatorId: userId })
        .sort(sortBy)
        .limit(currentLimit)
        .skip(skip);
      const totalCount = await this.getCollectionsCount(userId);
      return { collections, totalCount: { totalCount } };
    }
  }

  async getCollectionsWithMostItems() {
    const collections = await this.collectionsModel
      .find()
      .sort({ itemsCount: -1 })
      .limit(6);
    return { collections, totalCount: { totalCount: 6 } };
  }

  async updateCollection(updateDto: UpdateCollectionDto, id: string) {
    await this.collectionsModel.updateOne(
      { _id: id },
      {
        $set: {
          ...updateDto,
        },
      },
    );
    return this.getCollectionById(id);
  }

  async deleteCollection(id: string) {
    // await this.itemsService.deleteAllItemsOfCollection(id);
    await this.collectionsModel.deleteOne({ _id: id });
  }

  async itemsInCollectionPlus(id: string) {
    const collection = await this.getCollectionById(id);
    await this.collectionsModel.updateOne(
      { _id: id },
      {
        $set: {
          itemsCount: collection.itemsCount + 1,
        },
      },
    );
  }

  async itemsInCollectionMinus(id: string) {
    const collection = await this.getCollectionById(id);
    await this.collectionsModel.updateOne(
      { _id: id },
      {
        $set: {
          itemsCount: collection.itemsCount - 1,
        },
      },
    );
  }

  async getCollectionsCount(userId: string) {
    const totalCount = await this.collectionsModel
      .find({ creatorId: userId })
      .count();
    return totalCount;
  }
}

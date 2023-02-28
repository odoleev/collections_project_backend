import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from '../schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesEnum } from '../common/types';
import { Query } from 'express-serve-static-core';
import { returnQuery } from '../helpers/returnQuery';
import { usersPipeline } from '../common/pipelines';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UsersDocument>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const createdUser = new this.usersModel(dto);
    return createdUser.save();
  }

  async getAllUsers(query: Query) {
    const [search, sortBy, currentLimit, skip] = returnQuery(query, 'email');
    let users;
    let totalCount;
    if (search) {
      users = await this.usersModel
        .aggregate(usersPipeline(search))
        .sort(sortBy)
        .limit(currentLimit)
        .skip(skip);
      totalCount = users.length;
    } else {
      totalCount = await this.getUsersCount();
      users = await this.usersModel
        .find()
        .sort(sortBy)
        .limit(currentLimit)
        .skip(skip);
    }

    return { users, totalCount };
  }

  async ban(id: string): Promise<User> {
    await this.usersModel.updateOne(
      { _id: id },
      {
        $set: {
          banStatus: true,
        },
      },
    );

    return this.getUserById(id);
  }

  async unban(id: string): Promise<User> {
    await this.usersModel.updateOne(
      { _id: id },
      {
        $set: {
          banStatus: false,
        },
      },
    );

    return this.getUserById(id);
  }

  async delete(id: string): Promise<void> {
    await this.usersModel.deleteOne({ _id: id });
  }

  async makeAdmin(id: string): Promise<User> {
    await this.usersModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          roles: RolesEnum.ADMIN,
        },
      },
    );

    return this.getUserById(id);
  }

  async makeUser(id: string): Promise<User> {
    await this.usersModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          roles: RolesEnum.USER,
        },
      },
    );

    return this.getUserById(id);
  }

  async getUserByEmail(email: string) {
    const user = await this.usersModel.findOne({ email: email });
    return user;
  }

  async getUserById(id: string) {
    const user = await this.usersModel.findOne({ _id: id });
    return user;
  }

  async updateHashRt(id: string, hash: string) {
    await this.usersModel.updateOne(
      { _id: id },
      {
        $set: {
          hashedRt: hash,
        },
      },
    );
  }

  async setHashedRtNull(id: string) {
    await this.usersModel.updateMany(
      {
        _id: id,
      },
      {
        $set: {
          hashedRt: null,
        },
      },
    );
  }

  async getUsersCount() {
    const totalCount = await this.usersModel.find().count();
    return totalCount;
  }
}

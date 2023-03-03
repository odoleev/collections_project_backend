import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentsDocument } from '../schemas/comments.schema';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentsModel: Model<CommentsDocument>,
  ) {}

  async createComment(dto: CreateCommentDto) {
    const comment = new this.commentsModel({
      ...dto,
      createdAt: new Date(),
    });
    return comment.save();
  }

  async getCommentsByItemId(itemId: string) {
    const comments = await this.commentsModel.find({ itemId: itemId });
    return comments;
  }
}

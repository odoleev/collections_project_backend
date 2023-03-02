import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CommentsDocument = Comment & Document;

@Schema()
export class Comment {
  @ApiProperty({ example: 'name', description: 'Comment author' })
  @Prop({ required: true })
  author: string;

  @ApiProperty({ example: 'name', description: 'Comment author id' })
  @Prop({ required: true })
  authorId: string;

  @ApiProperty({ example: 'text', description: 'Comment text' })
  @Prop({ required: true })
  text: string;

  @ApiProperty({ example: 'Date', description: 'Comment creation date' })
  @Prop({ required: true })
  createdAt: Date;

  @ApiProperty({ example: 'string', description: 'Item id' })
  @Prop({ required: true })
  itemId: string;

  _id: mongoose.Types.ObjectId | string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

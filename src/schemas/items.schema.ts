import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ItemsDocument = Items & Document;

@Schema()
export class Items {
  @ApiProperty({ example: 'Name', description: 'Item name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: '[tag#1, tag#2]', description: 'Item tags' })
  @Prop({ required: true })
  tags: string[];

  @ApiProperty({ example: '16.02.2023', description: 'Creation date' })
  @Prop({ required: true })
  createdAt: Date;

  @ApiProperty({ example: 'string', description: `Collection's id` })
  @Prop({ required: true })
  collectionId: string;

  @ApiProperty({ example: 'string', description: `Creator id` })
  @Prop({ required: true })
  creatorId: string;

  @ApiProperty({ example: 'string', description: `Collection's name` })
  @Prop({ required: true })
  collectionName: string;

  @ApiProperty({
    example: 'String',
    description: 'Optional string field of item',
  })
  @Prop({ default: null })
  string1: string;

  @ApiProperty({
    example: 'String',
    description: 'Optional string field of item',
  })
  @Prop({ default: null })
  string2: string;

  @ApiProperty({
    example: 'String',
    description: 'Optional string field of item',
  })
  @Prop({ default: null })
  string3: string;

  @ApiProperty({
    example: '1',
    description: 'Optional number field of item',
  })
  @Prop({ default: null })
  number1: number;

  @ApiProperty({
    example: '1',
    description: 'Optional number field of item',
  })
  @Prop({ default: null })
  number2: number;

  @ApiProperty({
    example: '1',
    description: 'Optional number field of item',
  })
  @Prop({ default: null })
  number3: number;

  @ApiProperty({
    example: 'Some text with markdown',
    description: 'Optional text field of item',
  })
  @Prop({ default: null })
  text1: string;

  @ApiProperty({
    example: 'Some text with markdown',
    description: 'Optional text field of item',
  })
  @Prop({ default: null })
  text2: string;

  @ApiProperty({
    example: 'Some text with markdown',
    description: 'Optional text field of item',
  })
  @Prop({ default: null })
  text3: string;

  @ApiProperty({
    example: '21.03.1999',
    description: 'Optional date field of item',
  })
  @Prop({ default: null })
  date1: string;

  @ApiProperty({
    example: '21.03.1999',
    description: 'Optional date field of item',
  })
  @Prop({ default: null })
  date2: string;

  @ApiProperty({
    example: '21.03.1999',
    description: 'Optional date field of item',
  })
  @Prop({ default: null })
  date3: string;

  @ApiProperty({
    example: 'true',
    description: 'Optional boolean field of item',
  })
  @Prop({ default: null })
  boolean1: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Optional boolean field of item',
  })
  @Prop({ default: null })
  boolean2: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Optional boolean field of item',
  })
  @Prop({ default: null })
  boolean3: boolean;

  @ApiProperty({
    example: '[]',
    description: 'Array of users ids who liked item',
  })
  @Prop({ default: [] })
  likesUsers: string[];

  _id: mongoose.Types.ObjectId | string;
}

export const ItemsSchema = SchemaFactory.createForClass(Items);

import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CollectionsDocument = Collection & Document;

@Schema()
export class Collection {
  @ApiProperty({ example: 'Name', description: 'Collection name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'Some text', description: 'Collection description' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ example: 'Coins', description: 'Collection theme' })
  @Prop({ required: true })
  theme: string;

  @ApiProperty({ example: '16.02.2023', description: 'Creation date' })
  @Prop({ required: true })
  createdAt: Date;

  @ApiProperty({ example: 'string', description: `Creator's id` })
  @Prop({ required: true })
  creatorId: string;

  @ApiProperty({ example: 'Name', description: `Creator's username` })
  @Prop({ required: true })
  creatorUsername: string;

  @ApiProperty({ example: 'url/image', description: `Image url` })
  @Prop({ required: false, default: null })
  imgUrl: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of string1 field of item',
  })
  @Prop({ default: null })
  string1descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of string2 field of item',
  })
  @Prop({ default: null })
  string2descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of string3 field of item',
  })
  @Prop({ default: null })
  string3descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of number1 field of item',
  })
  @Prop({ default: null })
  number1descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of number2 field of item',
  })
  @Prop({ default: null })
  number2descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of number3 field of item',
  })
  @Prop({ default: null })
  number3descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of text1 field of item',
  })
  @Prop({ default: null })
  text1descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of text2 field of item',
  })
  @Prop({ default: null })
  text2descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of text3 field of item',
  })
  @Prop({ default: null })
  text3descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of date1 field of item',
  })
  @Prop({ default: null })
  date1descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of date2 field of item',
  })
  @Prop({ default: null })
  date2descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of date3 field of item',
  })
  @Prop({ default: null })
  date3descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of boolean1 field of item',
  })
  @Prop({ default: null })
  boolean1descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of boolean2 field of item',
  })
  @Prop({ default: null })
  boolean2descr: string;

  @ApiProperty({
    example: 'Some name',
    description: 'Name of boolean3 field of item',
  })
  @Prop({ default: null })
  boolean3descr: string;

  @ApiProperty({
    example: '2',
    description: 'Number of items',
  })
  @Prop({ default: 0 })
  itemsCount: number;

  _id: mongoose.Types.ObjectId | string;
}

export const CollectionsSchema = SchemaFactory.createForClass(Collection);

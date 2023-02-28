import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ example: 'Name', description: 'Item name' })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '[tag#1, tag#2]', description: 'Item tags' })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsArray()
  readonly tags: string[];

  @ApiProperty({ example: 'string', description: `Collection's id` })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly collectionId: string;

  @ApiProperty({
    example: 'String',
    description: 'Optional string field of item',
  })
  @Prop({ default: null })
  @IsOptional()
  @IsString()
  readonly string1: string;

  @ApiProperty({
    example: 'String',
    description: 'Optional string field of item',
  })
  @Prop({ default: null })
  @IsOptional()
  @IsString()
  readonly string2: string;

  @ApiProperty({
    example: 'String',
    description: 'Optional string field of item',
  })
  @Prop({ default: null })
  @IsOptional()
  @IsString()
  readonly string3: string;

  @ApiProperty({
    example: '1',
    description: 'Optional number field of item',
  })
  @Prop({ default: null })
  @IsOptional()
  @IsNumber()
  readonly number1: number;

  @ApiProperty({
    example: '1',
    description: 'Optional number field of item',
  })
  @Prop({ default: null })
  @IsOptional()
  @IsNumber()
  readonly number2: number;

  @ApiProperty({
    example: '1',
    description: 'Optional number field of item',
  })
  @Prop({ default: null })
  @IsOptional()
  @IsNumber()
  readonly number3: number;

  @ApiProperty({
    example: 'Some text with markdown',
    description: 'Optional text field of item',
  })
  @Prop({ default: null })
  @IsOptional()
  @IsString()
  readonly text1: string;

  @ApiProperty({
    example: 'Some text with markdown',
    description: 'Optional text field of item',
  })
  @Prop({ default: null })
  @IsOptional()
  @IsString()
  readonly text2: string;

  @ApiProperty({
    example: 'Some text with markdown',
    description: 'Optional text field of item',
  })
  @Prop({ default: null })
  @IsOptional()
  @IsString()
  readonly text3: string;

  @ApiProperty({
    example: '21.03.1999',
    description: 'Optional date field of item',
  })
  @Prop({ default: null })
  @IsOptional()
  @IsDate()
  readonly date1: Date;

  @ApiProperty({
    example: '21.03.1999',
    description: 'Optional date field of item',
  })
  @Prop({ default: null })
  @IsOptional()
  @IsDate()
  readonly date2: Date;

  @ApiProperty({
    example: '21.03.1999',
    description: 'Optional date field of item',
  })
  @Prop({ default: null })
  @IsOptional()
  @IsDate()
  readonly date3: Date;

  @ApiProperty({
    example: 'true',
    description: 'Optional boolean field of item',
  })
  @Prop({ default: null })
  @IsOptional()
  @IsBoolean()
  readonly boolean1: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Optional boolean field of item',
  })
  @Prop({ default: null })
  @IsOptional()
  @IsBoolean()
  readonly boolean2: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Optional boolean field of item',
  })
  @Prop({ default: null })
  @IsOptional()
  @IsBoolean()
  readonly boolean3: boolean;
}

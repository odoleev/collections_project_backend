import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'name', description: 'Comment author' })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @ApiProperty({ example: 'text', description: 'Comment text' })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @ApiProperty({ example: 'string', description: 'Item id' })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly itemId: string;
}

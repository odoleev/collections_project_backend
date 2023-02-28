import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from '../common/types';

export type UsersDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ example: 'email@mail.com', description: 'Email address' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ example: 'name', description: 'Username' })
  @Prop({ required: true })
  username: string;

  @ApiProperty({ example: 'Qwerty123!', description: 'Hashed password' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 'true', description: 'User ban status' })
  @Prop({ required: true, default: false })
  banStatus: boolean;

  @ApiProperty({ example: 'user', description: 'User role' })
  @Prop({ required: true, default: RolesEnum.USER })
  roles: RolesEnum;

  @ApiProperty({ example: 'string', description: 'Hashed refresh token' })
  @Prop({ default: null })
  hashedRt: string;

  _id: mongoose.Types.ObjectId | string;
}

export const UsersSchema = SchemaFactory.createForClass(User);

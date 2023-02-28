import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from '../schemas/users.schema';
import { Roles } from '../common/decorators';
import { RolesEnum } from '../common/types';
import { Query as ExpressQuery } from 'express-serve-static-core';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(RolesEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  async getAllUsers(@Query() query: ExpressQuery) {
    return await this.usersService.getAllUsers(query);
  }

  @Patch('block/:id')
  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200, type: User })
  @Roles(RolesEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  async banUser(@Param('id') id: string) {
    return await this.usersService.ban(id);
  }

  @Patch('unblock/:id')
  @ApiOperation({ summary: 'Unban user' })
  @ApiResponse({ status: 200, type: User })
  @Roles(RolesEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  async unblockUser(@Param('id') id: string) {
    return await this.usersService.unban(id);
  }

  @Patch('role-admin/:id')
  @ApiOperation({ summary: 'Change user role to admin' })
  @ApiResponse({ status: 200, type: User })
  @Roles(RolesEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  async makeRoleAdmin(@Param('id') id: string) {
    return await this.usersService.makeAdmin(id);
  }

  @Patch('role-user/:id')
  @ApiOperation({ summary: 'Change user role to user' })
  @ApiResponse({ status: 200, type: User })
  @Roles(RolesEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  async makeRoleUser(@Param('id') id: string) {
    return await this.usersService.makeUser(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200 })
  @Roles(RolesEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}

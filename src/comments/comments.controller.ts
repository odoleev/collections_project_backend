import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from '../schemas/comments.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get comments by Item id' })
  @ApiResponse({ status: 200, type: [Comment] })
  @HttpCode(HttpStatus.OK)
  async getCommentByItemId(@Param('id') id: string) {
    return await this.commentsService.getCommentsByItemId(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: 200, type: Comment })
  @HttpCode(HttpStatus.OK)
  async createCollection(@Body() dto: CreateCommentDto) {
    return await this.commentsService.createComment(dto);
  }
}

import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Items, ItemsSchema } from '../schemas/items.schema';
import { CollectionsModule } from '../collections/collections.module';

@Module({
  imports: [
    CollectionsModule,
    MongooseModule.forFeature([{ name: Items.name, schema: ItemsSchema }]),
  ],
  providers: [ItemsService],
  controllers: [ItemsController],
  exports: [ItemsService],
})
export class ItemsModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './config/MongooseConfigService';
import configurations from './config/configurations';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './common/guards';
import { RolesGuard } from './common/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';
import { CollectionsModule } from './collections/collections.module';
import { ItemsModule } from './items/items.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ConfigModule.forRoot({
      load: [configurations],
    }),
    UsersModule,
    AuthModule,
    CollectionsModule,
    ItemsModule,
    CommentsModule,
  ],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

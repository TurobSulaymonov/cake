import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import LikeSchema from '../../schemas/Like.model';
import { AuthModule } from '../auth/auth.module';
import { LikeService } from './like.service';

@Module({
    imports: [
        MongooseModule.forFeature([
         {
           name: "Like", 
           schema: LikeSchema,
         },
  ]),
],
providers:[LikeService],
exports: [LikeService],
})
export class LikeModule {}

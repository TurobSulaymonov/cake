import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MemberSchema from '../../schemas/Member.model';
import { AuthModule } from '../auth/auth.module';
import { FollowService } from './follow.service';
import { FollowResolver } from './follow.resolver';
import { MemberModule } from '../member/member.module';
import FollowSchema from '../../schemas/Follow.model';

@Module({ imports: [
    MongooseModule.forFeature([
     {
       name: "Follow", 
       schema: FollowSchema,
     }
   ]), 
    AuthModule,
    MemberModule,
    
   ],
   providers: [FollowService, FollowResolver],
   exports: [FollowService],})
export class FollowModule {}

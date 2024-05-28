import { Module } from '@nestjs/common';
import { MemberResolver } from './member.resolver';
import { MemberService } from './member.service';
import { MongooseModule } from '@nestjs/mongoose';
import MemberSchema from '../../schemas/Member.model';
import { AuthModule } from '../auth/auth.module';
import { ViewGroup } from '../../libs/enums/view.enum';
import { ViewModule } from '../view/view.module';
import { LikeService } from '../like/like.service';
import { LikeModule } from '../like/like.module';

@Module({
  imports: [
   MongooseModule.forFeature([
    {
      name: "Member", 
      schema: MemberSchema,
    }
  ]), 
   AuthModule,
   ViewModule,
   LikeModule,
  ],
  providers: [MemberResolver, MemberService],
  exports: [MemberService],
})
export class MemberModule {}

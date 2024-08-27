import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import LikeSchema from '../../schemas/Like.model';
import { AuthModule } from '../auth/auth.module';
import { LikeService } from './like.service';
import { NotificationModule } from '../notification/notification.module';
import { MemberModule } from '../member/member.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Like', schema: LikeSchema }]),
		NotificationModule,
		forwardRef(() => MemberModule),
	],
providers:[LikeService],
exports: [LikeService],
})
export class LikeModule {}

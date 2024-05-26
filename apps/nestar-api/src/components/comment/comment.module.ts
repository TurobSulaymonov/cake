import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import CommentSchema from "../../schemas/Comment.model";
import { AuthModule } from "../auth/auth.module";
import { ViewModule } from "../view/view.module";
import { MemberModule } from "../member/member.module";
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';



@Module({
    imports:[
        MongooseModule.forFeature([
            {
              name: "Comment", 
              schema: CommentSchema,
            }
          ]), 
           AuthModule,
           ViewModule,
           MemberModule,
          ],
   
  providers: [CommentResolver, CommentService],
  exports: [CommentService],
})
export class CommentModule {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from 'apps/nestar-api/src/libs/dto/member/member';
import { Property } from 'apps/nestar-api/src/libs/dto/property/property';
import { MemberStatus, MemberType } from 'apps/nestar-api/src/libs/enums/member.enum';
import { productStatus } from 'apps/nestar-api/src/libs/enums/property.enum';
import { Model } from 'mongoose';

@Injectable()
export class BatchService {
  constructor(
    @InjectModel("Property") private readonly propertyModel: Model<Property>,
    @InjectModel("Member") private readonly memberModel: Model<Member>,
  ) {}


  public async batchRollback(): Promise<void> {
    console.log("batchRollback");
   
    await this.propertyModel
    .updateMany({
      productStatus: productStatus.ACTIVE,
    },
     { propertyRank: 0 },
  )
  .exec();
  
  await this.memberModel
  .updateMany({
    memberStatus: MemberStatus.ACTIVE,
  },
  { memberRank: 0 },
)
.exec();
  }
  
  
  public async batchTopProperties(): Promise<void> {
    console.log("batchProperties")
    const properties: Property[] = await this.propertyModel
    .find({
      productStatus: productStatus.ACTIVE,
      propertyRank: 0,
    })
    .exec();

    const promisedList = properties.map(async (ele: Property) => {
      const { _id, productLikes, productViews} = ele;
      const rank = productLikes * 2 + productViews * 1;
      return await this.propertyModel.findByIdAndUpdate(_id, { propertyRank: rank});
    })
    await Promise.all(promisedList);
  }
  
  public async batchTopAgents(): Promise<void> {
    console.log("batchAgents++");
    const agents: Member[] = await this.memberModel
    .find({
      memberType: MemberType.AGENT,
      memberStatus: MemberStatus.ACTIVE,
      memberRank: 0,
    })
    .exec();

    const promisedList = agents.map( async (ele: Member) => {
      const { _id, memberProperties, memberLikes, memberArticles, memberViews} = ele;
      const  rank = memberProperties * 5 + memberArticles * 3 + memberLikes * 2 + memberViews * 1; 
      return await this.memberModel.findByIdAndUpdate(_id, {memberRank: rank})
    });
    await Promise.all(promisedList);
  }

  getHello(): string {
    return "Welcome to Nestar BATCH Server!";
  }
}

import { BadRequestException, ConsoleLogger, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Properties, Property } from '../../libs/dto/property/property';
import { 
    AgentPropertiesInquiry, 
    AllPropertiesInquiry, 
    OrdinaryInquiry, 
    PropertiesInquiry, 
    PropertyInput 
} from '../../libs/dto/property/property.input';
import { Direction, Message } from '../../libs/enums/common.enum';
import { MemberService } from '../member/member.service';
import { ProductStatus } from '../../libs/enums/property.enum';
import { StatisticModifier, T } from '../../libs/types/common';
import { ViewGroup } from '../../libs/enums/view.enum';
import { ViewService } from '../view/view.service';
import * as moment from "moment"
import { PropertyUpdate } from '../../libs/dto/property/property.update';
import { lookupAuthMemberLiked, lookupMember, shapeIntoMongoObjectId } from '../../libs/config';
import { LikeService } from '../like/like.service';
import { LikeInput } from '../../libs/dto/like/like.input';
import { LikeGroup } from '../../libs/enums/like.enum';

@Injectable()
export class PropertyService {
   constructor(@InjectModel("Property") private readonly propertyModel: Model<Property>,
    private memberService: MemberService,
    private viewService: ViewService,
    private likeService: LikeService,

 ) {}

    public async createProperty (input: PropertyInput,): Promise<Property>{
        
        try{
            const result = await this.propertyModel.create(input)
            // increase memberProperty'
            await this.memberService.memberStatsEditor({
               _id: result.memberId,
                targetKey: 'memberProperties',
                modifier: 1,
        });
          return result;
        }
        catch(err){
            console.log("Error. Service.model", err.message);
            throw new BadRequestException(Message.CREATE_FAILED);
        }

    }
    
    public async getProperty (memberId: ObjectId, propertyId: ObjectId): Promise<Property>{
        const search: T = {
            _id: propertyId,
            productStatus: ProductStatus.ACTIVE
        };
        const targetProperty: Property = await this.propertyModel.findOne(search).lean().exec();
        if(!targetProperty) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        
        if(memberId) {
            const viewInput = {memberId: memberId, viewRefId: propertyId, viewGroup: ViewGroup.PROPERTY};
            const newView = await this.viewService.recordView(viewInput);
            console.log("member:")
            if(newView){
                await this.propertyStatsEditor({_id: propertyId, targetKey: 'productViews', modifier: 1});
                targetProperty.productViews++;
            }

            //MeLiked
            const likeInput = {memberId: memberId, likeRefId: propertyId, likeGroup:LikeGroup.PROPERTY};
            targetProperty.meLiked = await this.likeService.checkLikeExistence(likeInput);
        }
        targetProperty.memberData = await this.memberService.getMember(null, targetProperty.memberId);
        return targetProperty;
    }

    public async getLastSoldProperty(): Promise<Property> {
		const lastSoldProperty = await this.propertyModel
			.findOne({ producStatus: ProductStatus.SOLD })
			.sort({ updatedAt: -1 })
			.exec();

		if (!lastSoldProperty) {
			throw new InternalServerErrorException('No sold properties found.');
		}
		return lastSoldProperty;
	}

    public async updateProperty(memberId: ObjectId, input: PropertyUpdate): Promise<Property> {
        let {productStatus, soldAt, deletedAt } = input;
        const search: T = {
            _id: input._id,
            memberId: memberId,
            productStatus: ProductStatus.ACTIVE,
        };

        if(productStatus === ProductStatus.SOLD ) soldAt = moment().toDate();
        else if (productStatus === ProductStatus.DELETE) deletedAt = moment().toDate();

        const result = await this.propertyModel
        .findOneAndUpdate(search, input, {
            new: true,
        })
        .exec();
        
        if(!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

        if(soldAt || deletedAt) {
            await this.memberService.memberStatsEditor({
        _id:memberId,
        targetKey: "memberProperties",
        modifier: -1,
            });
        }
        
        return result;
    }

    public async getProperties (memberId: ObjectId, input: PropertiesInquiry): Promise<Properties> {
        const match: T = { productStatus: ProductStatus.ACTIVE};
        const sort: T = {[input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

        this.shapeMatchQuery(match, input);
        console.log("match", match);

        const result = await this.propertyModel
        .aggregate([
            {$match: match},
            {$sort: sort},
            {
                $facet: {
                    list: [
                     { $skip: (input.page - 1 )  * input.limit},
                     {$limit: input.limit},
                     lookupAuthMemberLiked(memberId),
                     lookupMember,
                     {$unwind: "$memberData"},
                    ],
                    metaCounter: [{$count: "total"}],
                },
            },
        ])
        .exec();
        if(!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        return result[0]; 
    }

    private shapeMatchQuery(match: T, input: PropertiesInquiry): void {
        const {
			memberId,
			locationList,
            sizeList,
			roomsList,
			bedsList,
			typeList,
			periodsRange,
			pricesRange,
			squaresRange,
			options,
			text,
		} = input.search;
		if (memberId) match.memberId = shapeIntoMongoObjectId(memberId);
		if (locationList && locationList.length) match.propertyLocation = { $in: locationList };
		if (sizeList && sizeList.length) match.sizeLocation = { $in: sizeList };

		
		if (bedsList && bedsList.length) match.productLeftCount = { $in: bedsList };
		if (typeList && typeList.length) match.propertyType = { $in: typeList };

		if (pricesRange) match.productPrice = { $gte: pricesRange.start, $lte: pricesRange.end };
		if (periodsRange) match.createdAt = { $gte: periodsRange.start, $lte: periodsRange.end };
		if (squaresRange) match.productWeight = { $gte: squaresRange.start, $lte: squaresRange.end };

        
        if(text) match.productName = {$regex: new RegExp(text, 'i') };
        if(options) {
          match['$or'] = options.map((ele) => {
            return{[ele]:  true };
          });
        }
    }

     public async getFavorites(memberId: ObjectId, input: OrdinaryInquiry): Promise<Properties> {
        return await this.likeService.getFavoriteProperties(memberId, input)
     }
     public async getVisited(memberId: ObjectId, input: OrdinaryInquiry): Promise<Properties> {
        return await this.viewService.getVisitedProperties(memberId, input)
     }

    public async getAgentProperties(memberId: ObjectId, input: AgentPropertiesInquiry): Promise<Properties> {
        const { productStatus } = input.search;
        if(productStatus === ProductStatus.DELETE) throw new BadRequestException(Message.NOT_ALLOWED_REQUEST);
        
        const match: T = {
            memberId: memberId,
            productStatus: productStatus ?? { $ne: ProductStatus.DELETE },
         };
         const sort: T = {[input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC};

         const result = await this.propertyModel
         .aggregate([
            {$match: match}, 
            { $sort: sort},
            {
                $facet: {
                    list:[
                       { $skip: (input.page - 1) * input.limit},
                        {$limit: input.limit},
                        lookupMember,
                        {$unwind: '$memberData'},
                    ],
                    metaCounter:[{$count: 'total'}],
                },
            },
        
        ])
        .exec()

        if(!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
       
        return result[0];
   }

    
/**  LIKE **/  
public async likeTargetProperty(memberId: ObjectId, likeRefId: ObjectId): Promise<Property>{
    const target: Property = await this.propertyModel
    .findOne({_id: likeRefId, productStatus: ProductStatus.ACTIVE})
    .exec();
    console.log("heolloWord", target);
    if(!target) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
    
    const input: LikeInput ={
    memberId: memberId,
    likeRefId: likeRefId,
    likeGroup: LikeGroup.PROPERTY,
    };
  
    const modifier: number = await this.likeService.toggleLike(input);
    const result = await this.propertyStatsEditor({
      _id: likeRefId,
       targetKey: "productLikes", 
       modifier: modifier
      });
      if(!result) throw new InternalServerErrorException(Message.SOMETHING_WENT_WRONG);
      return result;
    } 
    

   public async getAllPropertiesByAdmin(input: AllPropertiesInquiry): Promise<Properties> {
    const { productStatus, propertyLocationList, productSizeList } = input.search;
    const match: T = {};
    const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC};
        if (productStatus) match.productStatus = productStatus;
		if (propertyLocationList) match.propertyLocation = { $in: propertyLocationList };
		if (productSizeList) match.productSize = { $in: productSizeList };

     const result = await this.propertyModel
     .aggregate([
        {$match: match}, 
        { $sort: sort},
        {
            $facet: {
                list:[
                   { $skip: (input.page - 1) * input.limit },
                    { $limit: input.limit },
                    lookupMember,
                    {$unwind: '$memberData'},
                ],
                metaCounter:[{$count: 'total'}],
            },
        },
    
    ])
    .exec()

    if(!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
   
    return result[0];
   }

   public async updatePropertyByAdmin(input: PropertyUpdate): Promise<Property> {
    let {productStatus, soldAt, deletedAt } = input;
    const search: T = {
        _id: input._id,
         productStatus: ProductStatus.ACTIVE,
    };

    if(productStatus === ProductStatus.SOLD ) soldAt = moment().toDate();
    else if (productStatus === ProductStatus.DELETE) deletedAt = moment().toDate();

    const result = await this.propertyModel
    .findOneAndUpdate(search, input, {
        new: true,
    })
    .exec();
    
    if(!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

    if(soldAt || deletedAt) {
        await this.memberService.memberStatsEditor({
    _id:result.memberId,
    targetKey: "memberProperties",
    modifier: -1,
        });
    }
    
    return result;
}

    public async removePropertyByAdmin(propertyId: ObjectId): Promise<Property> {

     const search: T = {_id: propertyId, productStatus: ProductStatus.DELETE};
     const result = await this.propertyModel.findOneAndDelete(search).exec()
     if(!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);

     return result;

    }

    public async propertyStatsEditor (input: StatisticModifier): Promise<Property> {
        const {_id, targetKey, modifier} = input;
        return await this.propertyModel
        .findByIdAndUpdate(
            _id,
            {$inc: { [targetKey]: modifier}},
            {
                new: true,
            },
        )
        .exec()
    }

}

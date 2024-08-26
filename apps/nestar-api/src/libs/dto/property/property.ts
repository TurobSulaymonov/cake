import { Field, InputType, Int,  ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { isNotEmpty } from "class-validator";
import { ProductSize, ProductStatus, PropertyLocation,  PropertyType } from "../../enums/property.enum";
import { Member, TotalCounter } from "../member/member";
import { MeLiked } from "../like/like";




@ObjectType()
export class Property{
    @Field(() => String)
    _id: ObjectId;
   
    @Field(() => PropertyType)
    propertyType:PropertyType;
    
    @Field(() => ProductStatus)
    productStatus?:ProductStatus;
    
    @Field(() => PropertyLocation)
    propertyLocation:PropertyLocation;

    @Field(() => ProductSize)
    productSize:ProductSize;

    @Field(() => String)
    productAddress: string;

    @Field(() => String)
    productName: string;

    @Field(() => Number)
    productPrice: number;

    @Field(() => Number)
    productWeight: number;

    @Field(() => Int)
    productLeftCount: number;



    @Field(() => Int)
    productViews: number;

    @Field(() => Int)
    productLikes: number;

    @Field(() => Int)
    productComments: number;

    @Field(() => Int)
    propertyRank: number;

    @Field(() => [String])
    productImages: string [];

    @Field(() => String, {nullable: true})
    productDesc?: string;

    @Field(() => Boolean)
    productChocolate: boolean;

    @Field(() => Boolean)
    fruitCake: boolean;
   

    @Field(() => String)
    memberId: ObjectId

    @Field(() => Date, { nullable: true})
    soldAt?: Date;

    @Field(() => Date, {nullable: true})
    deletedAt?: Date;

    @Field(() => Date, {nullable: true})
    constructedAt?: Date;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;

    /** from aggregation **/
    
    @Field(() => Member, {nullable: true})
    memberData?: Member

   
    @Field(() => [MeLiked], {nullable: true})
    meLiked?: MeLiked[];
}

 @ObjectType()
 export class Properties {
    @Field(() => [Property])
    list: Property[];
    
    @Field(() => [TotalCounter], {nullable: true})
    metaCounter: TotalCounter[];
   
  
 }



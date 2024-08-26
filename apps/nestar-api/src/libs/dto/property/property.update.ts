import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional, Length, Min, isAlpha } from "class-validator";
import { ObjectId } from "mongoose";
import { PropertyLocation, PropertyType, ProductStatus, ProductSize } from "../../enums/property.enum";


@InputType()
export class PropertyUpdate{
    @IsNotEmpty()
    @Field(() => String)
    _id: ObjectId;

    @IsOptional()
    @Field(() => PropertyType, {nullable: true})
    propertyType?: PropertyType;

    @IsOptional()
    @Field(() => ProductStatus, {nullable: true})
    productStatus?: ProductStatus;

    @IsOptional()
    @Field(() => PropertyLocation, {nullable: true})
    propertyLocation: PropertyLocation;

    @IsOptional()
    @Field(() => ProductSize, {nullable: true})
    productSize: ProductSize;

    @IsOptional()
    @Length(3, 100)
    @Field(() => String, {nullable: true})
    productAddress?: string;
  
    @IsOptional()
    @Length(3, 100)
    @Field(() => String, {nullable: true})
    productName?: string;
    
    @IsOptional()
    @Field(() => Number, {nullable: true})
    productPrice?: number;

    @IsOptional()
    @Field(() => Number, {nullable: true})
    productWeight?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Field(() => Int, {nullable: true})
    productLeftCount?: number;

    @IsOptional()
    @Field(() => [String], {nullable: true})
    productImages?: string[];

    @IsOptional()
    @Length(5, 500)
    @Field(() => String, {nullable: true})
    productDesc?: string;

    @IsOptional()
    @Field(() => Boolean, {nullable: true})
    productChocolate?: boolean;

    @IsOptional()
    @Field(() => Boolean, {nullable: true})
    fruitCake?: boolean;

    soldAt?: Date;

    deletedAt?: Date;

    @IsOptional()
    @Field(() => Date, {nullable: true})
    constructedAt?: Date;
}
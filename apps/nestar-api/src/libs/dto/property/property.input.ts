import { Field, InputType, Int } from "@nestjs/graphql";
import { IsIn, IsInt, IsNotEmpty, IsOptional, Length, Min, isNotEmpty } from "class-validator";
import { PropertyLocation, ProductStatus, PropertyType, ProductSize } from "../../enums/property.enum";

import { ObjectId } from "mongoose";
import { availableOptions, availablePropertySorts } from "../../config";
import { Direction } from "../../enums/common.enum";


@InputType()
export class PropertyInput {
	@IsNotEmpty()
	@Field(() => PropertyType)
	propertyType: PropertyType;

	@IsNotEmpty()
	@Field(() => PropertyLocation)
	propertyLocation: PropertyLocation;

	
	@IsNotEmpty()
	@Field(() => ProductSize)
	productSize: ProductSize;

	@IsNotEmpty()
	@Length(3, 100)
	@Field(() => String)
	productAddress: string;

	@IsNotEmpty()
	@Length(3, 100)
	@Field(() => String)
	productName: string;

	@IsNotEmpty()
	@Field(() => Number)
	productPrice: number;

	@IsNotEmpty()
	@Length(3, 100)
	@Field(() => String)
	productIngredients: string;

	@IsNotEmpty()
	@Field(() => Number)
	productWeight: number;

	@IsNotEmpty()
	@IsInt()
	@Min(1)
	@Field(() => Int)
	productLeftCount: number;



	@IsNotEmpty()
	@Field(() => [String])
	productImages: string[];

	@IsOptional()
	@Length(5, 500)
	@Field(() => String, { nullable: true })
	productDesc?: string;

	@IsOptional()
	@Field(() => Boolean, { nullable: true })
	productChocolate?: boolean;

	@IsOptional()
	@Field(() => Boolean, { nullable: true })
	fruitCake?: boolean;

	memberId?: ObjectId;

	@IsOptional()
	@Field(() => Date, { nullable: true })
	constructedAt?: Date;
}

@InputType()
export class PricesRange {
	@Field(() => Int)
	start: number;

	@Field(() => Int)
	end: number;
}

@InputType()
export class SquaresRange {
	@Field(() => Int)
	start: number;

	@Field(() => Int)
	end: number;
}

@InputType()
export class PeriodsRange {
	@Field(() => Date)
	start: Date;

	@Field(() => Date)
	end: Date;
}

@InputType()
export class PISearch {
 @IsOptional()
 @Field(() => String, { nullable: true })
 memberId?: ObjectId;

 @IsOptional()
 @Field(() => [PropertyLocation], { nullable: true })
 locationList?: PropertyLocation[];

 @IsOptional()
 @Field(() => [ProductSize], { nullable: true })
 sizeList?: ProductSize[];

 @IsOptional()
 @Field(() => [PropertyType], { nullable: true })
 typeList?: PropertyType[];

 @IsOptional()
 @Field(() => [Int], { nullable: true })
 roomsList?: Number[];

 @IsOptional()
 @Field(() => [Int], { nullable: true })
 bedsList?: Number[];

 @IsOptional()
 @IsIn(availableOptions, { each: true })
 @Field(() => [String], { nullable: true })
 options?: string[];

 @IsOptional()
 @Field(() => PricesRange, { nullable: true })
 pricesRange?: PricesRange;

 @IsOptional()
 @Field(() => PeriodsRange, { nullable: true })
 periodsRange?: PeriodsRange;

 @IsOptional()
 @Field(() => SquaresRange, { nullable: true })
 squaresRange?: SquaresRange;

 @IsOptional()
 @Field(() => String, { nullable: true })
 text?: string;
}

@InputType()
export class PropertiesInquiry {
 @IsNotEmpty()
 @Min(1)
 @Field(() => Int)
 page: number;

 @IsNotEmpty()
 @Min(1)
 @Field(() => Int)
 limit: number;

 @IsOptional()
 @IsIn(availablePropertySorts)
 @Field(() => String, { nullable: true })
 sort?: string;

 @IsOptional()
 @Field(() => Direction, { nullable: true })
 direction?: Direction;

 @IsNotEmpty()
 @Field(() => PISearch)
 search: PISearch;
}

@InputType()
class APISearch {
	@IsOptional()
	@Field(() => ProductStatus, { nullable: true })
	productStatus?: ProductStatus;
}

@InputType()
export class AgentPropertiesInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availablePropertySorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => APISearch)
	search: APISearch;
}

@InputType()
class ALPISerach {
	@IsOptional()
	@Field(() => ProductStatus, { nullable: true })
	productStatus?: ProductStatus;

	@IsOptional()
	@Field(() => [PropertyLocation], { nullable: true })
	propertyLocationList?: PropertyLocation[];

	
	@IsOptional()
	@Field(() => [ProductSize], { nullable: true })
	productSizeList?: ProductSize[];
}

@InputType()
export class AllPropertiesInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availablePropertySorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsOptional()
	@Field(() => ALPISerach)
	search: ALPISerach;
}

@InputType()
export class OrdinaryInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;
}

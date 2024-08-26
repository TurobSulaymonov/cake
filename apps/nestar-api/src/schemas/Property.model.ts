import { Schema } from 'mongoose';
import { PropertyLocation, PropertyType, ProductStatus, ProductSize } from '../libs/enums/property.enum';

const PropertySchema = new Schema(
	{
		propertyType: {
			type: String,
			enum: PropertyType,
			required: true,
		},

		productStatus: {
			type: String,
			enum: ProductStatus,
			default: ProductStatus.ACTIVE,
		},

		propertyLocation: {
			type: String,
			enum: PropertyLocation,
			required: true,
		},

		productSize:{
			type: String,
			enum:ProductSize,
			required: true,
		},

		productAddress: {
			type: String,
			required: true,
		},

		productName: {
			type: String,
			required: true,
		},

		productPrice: {
			type: Number,
			required: true,
		},
             /* alamshtirish kerak  */
		productWeight: {
			type: Number,
			required: true,
		},
          /* alamshtirish kerak  */
		productLeftCount: {
			type: Number,
			required: true,
		},


		productViews: {
			type: Number,
			default: 0,
		},

		productLikes: {
			type: Number,
			default: 0,
		},

		productComments: {
			type: Number,
			default: 0,
		},
         /*  */
		propertyRank: {
			type: Number,
			default: 0,
		},

		productImages: {
			type: [String],
			required: true,
		},

		productDesc: {
			type: String,
		},
         /*  */
		productChocolate: {
			type: Boolean,
			default: false,
		},
          /*  */
		fruitCake: {
			type: Boolean,
			default: false,
		},

		memberId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Member',
		},

		soldAt: {
			type: Date,
		},

		deletedAt: {
			type: Date,
		},

		constructedAt: {
			type: Date,
		},
	},
	{ timestamps: true, collection: 'properties' },
);

PropertySchema.index({ propertyType: 1, propertyLocation: 1, productName: 1, productPrice: 1 }, { unique: true });

export default PropertySchema;

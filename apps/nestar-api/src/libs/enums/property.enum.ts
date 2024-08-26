import { registerEnumType } from '@nestjs/graphql';

export enum PropertyType {
	BirthdayCake = 'BirthdayCake',
	AnniversaryCake = 'AnniversaryCake',
	CelebrationCake = 'CelebrationCake',
}
registerEnumType(PropertyType, {
	name: 'PropertyType',
});

export enum ProductStatus {
	ACTIVE = 'ACTIVE',
	SOLD = 'SOLD',
	DELETE = 'DELETE',
}
registerEnumType(ProductStatus, {
	name: 'ProductStatus',
});

export enum ProductSize {
	SMALL = "SMALL",
	MEDIUM ="MEDIUM",
	LARGE = 'LARGE'
}
registerEnumType(ProductSize, {
	name: 'ProductSize',
});

export enum PropertyLocation {
	SEOUL = 'SEOUL',
	BUSAN = 'BUSAN',
	INCHEON = 'INCHEON',
	DAEGU = 'DAEGU',
	GYEONGJU = 'GYEONGJU',
	GWANGJU = 'GWANGJU',
	CHONJU = 'CHONJU',
	DAEJON = 'DAEJON',
	JEJU = 'JEJU',
}
registerEnumType(PropertyLocation, {
	name: 'PropertyLocation',
});

import {
    IsNotEmpty,
    IsString,
    IsUUID,
    IsInt,
    Min
} from 'class-validator';
  
export class addItemToCartDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    productId: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    quantity: number;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    cartItemId?: string;
}
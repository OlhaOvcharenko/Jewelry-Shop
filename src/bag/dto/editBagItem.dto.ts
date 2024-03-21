import {
    IsNotEmpty,
    IsString,
    IsUUID,
    IsInt,
    Min,
    IsOptional
} from 'class-validator';


export class EditBagItem {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    bagItemId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    productId: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    quantity: number;

    
    @IsOptional()
    @IsString()
    comment?: string;
}
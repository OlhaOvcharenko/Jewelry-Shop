import {
    IsNotEmpty,
    IsString,
    IsUUID,
    IsInt,
    Min,
    Max
} from 'class-validator';
  
export class CreateOrderDTO {
    
    @IsNotEmpty()
    @IsString()
    @Min(4)
    @Max(10)
    clientName: string;

    @IsNotEmpty()
    @IsString()
    @Min(4)
    @Max(20)
    clientSurname: string;

    @IsNotEmpty()
    @IsString()
    @Min(10)
    @Max(20)
    email: string;


    @IsNotEmpty()
    @IsInt()
    @Min(5)
    @Max(15)
    phone: number;

    
    @IsNotEmpty()
    @IsString()
    @Min(10)
    @Max(20)
    address: string;

    
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    finalAmount?: number;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    cartItemId: string;


}
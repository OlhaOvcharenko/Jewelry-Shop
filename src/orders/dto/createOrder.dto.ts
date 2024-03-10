import {
    IsNotEmpty,
    IsString,
    IsUUID,
    IsInt,
    Min,
    Max
} from 'class-validator';
  
export class createOrderDTO {
    
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
    quantity: number;

    
    @IsNotEmpty()
    @IsString()
    @Min(10)
    @Max(20)
    addrress: string;

    
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    finalAmount?: number;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    productId: string;


}
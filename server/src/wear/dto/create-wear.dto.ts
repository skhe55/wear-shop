import { IsDefined, IsNumber, IsString } from "class-validator";
import { SizeTypes, WearTypes } from "./enums/enum-types";


export class CreateWearDto {
    @IsDefined()
    @IsString()
    readonly product_name: string;
    @IsDefined()
    @IsNumber()
    readonly price: number;
    @IsDefined()
    readonly sizes: SizeTypes[];
    @IsDefined()
    @IsNumber()
    readonly rating: number;
    @IsDefined()
    readonly wear_type: WearTypes;
}


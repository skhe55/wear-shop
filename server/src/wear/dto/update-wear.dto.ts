import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";
import { SizeTypes, WearTypes } from "./enums/enum-types";


export class UpdateWearDto {
    @IsDefined()
    readonly id: number;
    @IsString()
    @IsOptional()
    readonly product_name?: string;
    @IsInt()
    @IsOptional()
    readonly price?: number;
    @IsOptional()
    readonly sizes?: SizeTypes[];
    @IsInt()
    @IsOptional()
    readonly rating?: number;
    @IsOptional()
    readonly wear_type?: WearTypes;
}


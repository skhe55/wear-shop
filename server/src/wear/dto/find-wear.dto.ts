import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";

export class FindWearDto {
    @IsOptional()
    @IsInt()
    readonly id?: number;
    @IsOptional()
    @IsString()
    readonly product_name?: string;
    @IsOptional()
    @IsInt()
    readonly price?: number;
    @IsOptional()
    @IsString()
    readonly sizes?: string;
    @IsOptional()
    @IsInt()
    readonly rating?: number;
    @IsString()
    @IsDefined()
    readonly sortType: string;
    @IsString()
    @IsDefined()
    readonly sortByField: string;
    @IsInt()
    @IsDefined()
    readonly quantityOfElementsInGroup: number;
    @IsInt()
    @IsDefined()
    readonly offsetValue: number;
}
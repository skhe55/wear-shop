import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
    @IsString()
    readonly role_name: string;
    @IsNumber()
    readonly user_id: number;
}
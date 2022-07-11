import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly role_name: string;
}
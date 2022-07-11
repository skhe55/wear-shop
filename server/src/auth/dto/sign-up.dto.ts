import { IsDefined, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignUp {
    @IsDefined()
    @IsNotEmpty()
    readonly name: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly login: string;

    @IsDefined()
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;

}
import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { usersProvider } from "../database/providers/users.providers";
import { RolesModule } from "../roles/roles.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        ...usersProvider
    ],
    imports: [
        DatabaseModule,
        RolesModule,
        forwardRef(() => AuthModule)
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule {};
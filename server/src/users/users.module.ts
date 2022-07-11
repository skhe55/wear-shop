import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";
import { usersProvider } from "src/database/providers/users.providers";
import { RolesModule } from "src/roles/roles.module";
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
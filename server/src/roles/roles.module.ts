import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { rolesProvider } from "../database/providers/roles.providers";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";

@Module({
    providers: [
        RolesService,
        ...rolesProvider
    ],
    controllers: [RolesController],
    imports: [
        DatabaseModule
    ],
    exports: [
        RolesService
    ]
})
export class RolesModule {};
import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";
import { wearProvider } from "src/database/providers/wear.providers";
import { FilesModule } from "src/files/file.module";
import { RolesModule } from "src/roles/roles.module";
import { WearController } from "./wear.controller";
import { WearService } from "./wear.service";

@Module({
    providers: [
        WearService,
        ...wearProvider
    ],
    controllers: [
        WearController
    ], 
    imports: [
        DatabaseModule,
        FilesModule,
        RolesModule,
        forwardRef(() => AuthModule)
    ]
})
export class WearModule {}
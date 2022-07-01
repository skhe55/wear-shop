import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { wearProvider } from "src/database/providers/wear.providers";
import { FilesModule } from "src/files/file.module";
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
    ]
})
export class WearModule {}
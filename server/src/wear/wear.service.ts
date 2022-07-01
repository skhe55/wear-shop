import { Inject, Injectable, Logger } from "@nestjs/common";
import { WearEntity } from "src/database/entities/wear.entity";
import { WEAR_REPOSITORY } from "src/database/providers/constants";
import { FilesService } from "src/files/file.service";
import { CreateWearDto } from "./dto/create-wear.dto";

@Injectable()
export class WearService {
    private logger: Logger;

    constructor(
        @Inject(WEAR_REPOSITORY)
        private wearEntity: typeof WearEntity,
        private fileService: FilesService
    ) {
        this.logger = new Logger('Wear Service');
    }

    public async create(dto: CreateWearDto, image: unknown) {
        const fileName = await this.fileService.createFile(image);
        const wear = await this.wearEntity.create({
            ...dto,
            image_url: fileName
        })
        return wear;
    }
}
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

    public async create(dto: CreateWearDto, image) {
        const {product_name, price, sizes, rating } = dto;
        const fileName = await this.fileService.createFile(image);
        const wear = await this.wearEntity.create({
            product_name: product_name,
            price: price,
            sizes: sizes.slice(1, sizes.length - 1).split(',').map(Number),
            rating: rating,
            image_url: fileName
        })
        return wear;
    }
}
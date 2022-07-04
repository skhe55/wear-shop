import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { WearEntity } from "src/database/entities/wear.entity";
import { WEAR_REPOSITORY } from "src/database/providers/constants";
import { FilesService } from "src/files/file.service";
import { ReturnHelper } from "src/helpers/event.helper";
import { ObjectService } from "src/services/object.service";
import { CreateImgDto } from "./dto/create-img.dto";
import { CreateWearDto } from "./dto/create-wear.dto";
import { FindWearDto } from "./dto/find-wear.dto";
import { UpdateWearDto } from "./dto/update-wear.dto";

type FilteredWear = Required<{
    data: WearEntity[] | null;
    status: string | HttpException;
    quantityOfWear: number | null;
    maximumPages: number | null;
}>

@Injectable()
export class WearService {
    private logger: Logger;
    private objectService: ObjectService;

    constructor(
        @Inject(WEAR_REPOSITORY)
        private wearEntity: typeof WearEntity,
        private fileService: FilesService
    ) {
        this.logger = new Logger('Wear Service');
        this.objectService = new ObjectService();
    }
    /**
     * Create wear
     * @param dto 
     * @param image 
     * @returns {Promise<WearEntity | HttpException>}
     */
    public async create(dto: CreateWearDto, image: CreateImgDto): Promise<WearEntity | HttpException> {
        try {
            const {product_name, price, sizes, rating, wear_type } = dto;
            const fileName = await this.fileService.createFile(image);
            const wear = await this.wearEntity.create({
                product_name: product_name,
                price: price,
                sizes: sizes,
                rating: rating,
                wear_type: wear_type,
                image_url: fileName
            })
            return wear;
        } catch(error) {
            this.logger.log(`Wear Service | Create: ${error}`);
            return new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Delete wear from database
     * @param id 
     * @returns {Promise<string | HttpException>}
     */
    public async delete(id: number): Promise<string | HttpException> {
        try {
            const findedWear = await this.wearEntity.findOne({
                where: {
                    id: id
                }
            });

            if(!findedWear) {
                return "success";
            }

            await this.wearEntity.destroy({
                where: {
                    id: id
                }
            });
            return "success";
        } catch(error) {
            this.logger.log(`Wear Service | Delete: ${error}`);
            return new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Update wear in database
     * @param dto 
     * @returns {Promise<ReturnHelper<WearEntity[]>>}
     */
    public async update(dto: UpdateWearDto, image?: CreateImgDto): Promise<ReturnHelper<WearEntity[]>> {
        try {
            let args = {};
            if(!dto.id) {
                return {
                    status: 'id передан не верно',
                    result: null
                }
            }
            if(image) {
                const fileName = await this.fileService.createFile(image);
                args = {...dto, image_url: fileName}
            } else {
                args = {...dto};
            }
            const updatedWear = await this.wearEntity.update({
                ...args
            }, {
                where: {
                    id: dto.id
                },
                returning: true
            });
            return {
                status: "success",
                result: updatedWear[1]
            }
        } catch(error) {    
            this.logger.log(`Wear Service | Update: ${error}`);
            return {
                status: new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR),
                result: null
            };
        }
    }
    /**
     * Get all wear
     * @returns {Promise<WearEntity[] | HttpException>}
     */
    public async getAll(): Promise<WearEntity[] | HttpException> {
        try {
            const wear = await this.wearEntity.findAll();
            return wear;
        } catch(error) {
            this.logger.log(`Wear Service | getAll: ${error}`);
            return new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } 
    /**
     * Get filtered wear with data for paginations
     * @param dto 
     * @returns {Promise<FilteredWear>}
     */
    public async getWearByFilter(dto: FindWearDto): Promise<FilteredWear> {
        try {
            const { sortType, sortByField, quantityOfElementsInGroup, offsetValue } = dto;
            const validDto = this.objectService.overloadWithoutFields(['sortType', 'sortByField', 'quantityOfElementsInGroup', 'offsetValue'], dto);
            
            const quantityOfWear = await this.wearEntity.count({
                where: {
                    ...validDto
                }
            });
            
            const maximumPages = Math.ceil(quantityOfWear / quantityOfElementsInGroup);

            const findedWear = await this.wearEntity.findAll({
                where: {
                    ...validDto
                },
                order: [
                    [sortByField || 'id', sortType || 'ASC']
                ],
                limit: quantityOfElementsInGroup,
                offset: offsetValue,
                raw: true
            });

            if(findedWear.length === 0) {
                return {
                    data: null,
                    status: "not found",
                    quantityOfWear: null,
                    maximumPages: null
                }
            }

            return {
                data: findedWear,
                status: "success",
                quantityOfWear: quantityOfWear,
                maximumPages: maximumPages
            }
        } catch(error) {
            this.logger.log(`Wear Service | getClothesByFilter: ${error}`);
            return {
                data: null,
                status: new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR),
                quantityOfWear: null,
                maximumPages: null
            };
        }
    }
}
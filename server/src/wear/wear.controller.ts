import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation } from "@nestjs/swagger";
import { CreateImgDto } from "./dto/create-img.dto";
import { CreateWearDto } from "./dto/create-wear.dto";
import { FindWearDto } from "./dto/find-wear.dto";
import { UpdateWearDto } from "./dto/update-wear.dto";
import { WearService } from "./wear.service";

@Controller('wear')
export class WearController {
    constructor(private wearService: WearService) {}
    
    @ApiOperation({summary: "Создать новую карточку одежды с картинкой."})
    @Post("/create-wear")
    @UseInterceptors(FileInterceptor('image'))
    async createWear(@Body() dto: CreateWearDto, @UploadedFile() image: CreateImgDto) {
        return await this.wearService.create(dto, image); 
    }

    @ApiOperation({summary: "Обновить карточку одежды с картинкой."})
    @Put("/update-wear")
    @UseInterceptors(FileInterceptor('image'))
    async updateWear(@Body() dto: UpdateWearDto, @UploadedFile() image: CreateImgDto) {
        return await this.wearService.update(dto, image);
    }

    @ApiOperation({summary: "Удалить карточку одежды."})
    @Delete(":id")
    async deleteWear(@Param('id') id:string) {
        return await this.wearService.delete(Number(id));
    }

    @ApiOperation({summary: "Получить все карточки с одеждой."})
    @Get("/get-wear")
    async getWear() {
        return await this.wearService.getAll();
    }

    @ApiOperation({summary: "Получить карточки с одеждой по заданным полям, в данными для пагинирования."})
    @Post("/filter-wear")
    async getWearByFilter(@Body() dto: FindWearDto) {
        return await this.wearService.getWearByFilter(dto);
    }
}
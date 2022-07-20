import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation } from "@nestjs/swagger";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { CreateImgDto } from "./dto/create-img.dto";
import { CreateWearDto } from "./dto/create-wear.dto";
import { FindWearDto } from "./dto/find-wear.dto";
import { UpdateWearDto } from "./dto/update-wear.dto";
import { WearService } from "./wear.service";

@Controller('wear')
export class WearController {
    constructor(private wearService: WearService) {}
    
    @ApiOperation({summary: "Создать новую карточку одежды с картинкой."})
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Post("/create-wear")
    @UseInterceptors(FileInterceptor('image'))
    async createWear(@Body() dto: CreateWearDto, @UploadedFile() image: CreateImgDto) {
        return await this.wearService.create(dto, image); 
    }

    @ApiOperation({summary: "Обновить карточку одежды с картинкой."})
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Put("/update-wear")
    @UseInterceptors(FileInterceptor('image'))
    async updateWear(@Body() dto: UpdateWearDto, @UploadedFile() image: CreateImgDto) {
        return await this.wearService.update(dto, image);
    }

    @ApiOperation({summary: "Удалить карточку одежды."})
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Delete("/delete-wear/:id")
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

    @ApiOperation({summary: "Получить карточку с одеждой по айди"})
    @Get("/:id")
    async getWearById(@Param('id') id:string) {
        return await this.wearService.getWearById(Number(id));
    }
}
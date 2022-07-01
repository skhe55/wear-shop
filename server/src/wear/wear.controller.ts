import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateImgDto } from "./dto/create-img.dto";
import { CreateWearDto } from "./dto/create-wear.dto";
import { WearService } from "./wear.service";

@Controller('wear')
export class WearController {
    constructor(private wearService: WearService) {}
    
    @Post("/create-wear")
    @UseInterceptors(FileInterceptor('image'))
    async createWear(@Body() dto: CreateWearDto, @UploadedFile() image: CreateImgDto) {
        return await this.wearService.create(dto, image); 
    }
}
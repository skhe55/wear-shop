import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { CreateImgDto } from "./dto/create-img.dto";

@Injectable()
export class FilesService {
    static allowTypes = [
        'image/jpeg',
        'image/png'
    ]

    async createFile(file: CreateImgDto): Promise<string> {
        try {
            const {buffer, originalname, mimetype} = file;
            if(!FilesService.isAllowFileType(mimetype)) {
                throw new HttpException('Не разрешённый разрешение файла', HttpStatus.BAD_GATEWAY);
            }
            const extension = `.${originalname.split('.')[1].toLowerCase()}`;
            const fileName = uuid.v4() + extension;
            const filePath = path.resolve(__dirname, '..', 'static')
            if(this.checkFileExists(filePath)) {
                this.makeDirectory(filePath);
            }
            this.writeFile(path.join(filePath, fileName), buffer);
            return fileName;
            
        } catch(error) {
            console.log(error);
            throw new HttpException(`Произошла ошибка при записи файла`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async checkFileExists(filepath:string): Promise<unknown> {
        return new Promise((resolve, reject) => {
            fs.access(filepath, fs.constants.F_OK, error => {
                resolve(!error);
            });
        });
    }

    async makeDirectory(filepath:string): Promise<unknown> {
        return new Promise((resolve, reject) => {
            fs.mkdir(filepath, error => {
                resolve(!error);
            })
        })
    }

    async writeFile(filepath:string, data): Promise<unknown>{
        return new Promise((resolve, reject) => {
            fs.writeFile(filepath, data, error => {
                if(error) reject(error);
                else resolve(data);
            })
        })
    }

    static isAllowFileType(type: string) {
        for(const allowType of FilesService.allowTypes) {
            if(type === allowType) {
                return true;
            }
        }
        return false;
    }
}
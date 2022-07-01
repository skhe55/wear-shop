import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
    async createFile(file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static')
            if(this.checkFileExists(filePath)) {
                this.makeDirectory(filePath);
            }
            this.writeFile(path.join(filePath, fileName), file.buffer);
            return fileName;
            
        } catch(error) {
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
}
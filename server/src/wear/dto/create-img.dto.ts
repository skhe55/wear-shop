export class CreateImgDto {
    readonly buffer: Buffer;
    readonly originalname: string;
    readonly encoding: string;
    readonly mimetype: string;
    readonly size: number;
}
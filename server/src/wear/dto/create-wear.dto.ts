export class CreateWearDto {
    readonly product_name: string;
    readonly price: number;
    readonly image_url: string;
    readonly sizes: number[];
    readonly rating: number;
}
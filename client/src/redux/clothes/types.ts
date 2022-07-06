export enum Status {
    SUCCESS = 'success',
    NOT_FOUND = 'not found',
    LOADING = 'loading'
}

export enum WearTypes {
    TSHIRT = 'T-shirt',
    HOODIE = 'Hoodie',
    PANTS = 'Pants'
}

export enum SizeTypes {
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
    XLXL = '2XL'
}

export type Clothes = {
    id: number;
    product_name: string;
    price: number;
    image_url: string;
    sizes: SizeTypes[];
    rating: number;
    wear_type: WearTypes;
}

type SearchClothesParams = {
    sortByField: string;
    sortType: string;
    quantityOfElementsInGroup: number;
    offsetValue: number;
}

export type RequestClothesBody = Partial<Clothes> & Required<SearchClothesParams>; 

export interface ResponseClothesBody {
    data: [
        Clothes
    ],
    status: string;
    quantityOfWear: number;
    maximumPages: number;
}

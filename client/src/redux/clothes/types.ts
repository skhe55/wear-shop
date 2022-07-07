export enum Status {
    SUCCESS = 'success',
    NOT_FOUND = 'not found',
    LOADING = 'loading'
}

export type Clothes = {
    id: number;
    product_name: string;
    price: number;
    image_url: string;
    sizes: string[];
    rating: number;
    wear_type: string;
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

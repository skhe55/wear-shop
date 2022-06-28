export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface Clothes {
    id: string;
    product_name: string;
    available_size: string;
}
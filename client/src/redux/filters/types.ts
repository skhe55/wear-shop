export interface FiltersSliceState {
    searchValue: string;
    categoryName: string;
    currentPage: number;
    sort: Sort;
    fetching: boolean;
}

export enum SortPropertyEnum {
    RATING_DESC = 'rating-desc',
    RATING_ASC = 'rating-asc',
    PRICE_DESC = 'price-desc',
    PRICE_ASC = 'price-asc',
    PRODUCT_NAME_ASC = 'product_name-asc',
    PRODUCT_NAME_DESC = 'product_name-desc'
}

export type Sort = Required<{
    name: string;
    sortProperty: SortPropertyEnum;
}>


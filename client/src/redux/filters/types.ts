export interface FiltersSliceState {
    searchValue: string;
    categoryName: string;
    currentPage: number;
    sort: Sort;
    fetching: boolean;
}

export enum SortPropertyEnum {
    RATING_DESC = 'rating_desc',
    RATING_ASC = 'rating_asc',
    PRICE_DESC = 'price_desc',
    PRICE_ASC = 'price_asc',
}

export type Sort = Required<{
    name: string;
    sortProperty: SortPropertyEnum;
}>


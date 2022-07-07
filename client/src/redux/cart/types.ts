export type CartItem = {
    id: number;
    product_name: string;
    price: number;
    image_url: string;
    sizes: string[];
    rating: number;
    wear_type: string;
    count: number;
}

export interface CartSliceState {
    total_price: number;
    items: CartItem[];
}


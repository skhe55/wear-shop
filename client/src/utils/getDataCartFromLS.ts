import { CartItem } from "../redux/cart/types";
import { calculateTotalPrice } from "./calculateTotalPrice";

export const getDataCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const total_price = calculateTotalPrice(items);

    return {
        items: items as CartItem[],
        total_price,
    };
}
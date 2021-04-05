import {OrderItem} from "./order-item";

export interface Order {
    id: number;
    name: string;
    email: string;
    total: number;
    order_items: OrderItem[];
}

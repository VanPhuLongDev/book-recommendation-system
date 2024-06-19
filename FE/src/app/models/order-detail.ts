import {User} from './user';
import {OrderItem} from './order-item';

export interface OrderDetail {
  id?: number;
  dateOrder?: Date;
  totalPrice?: number;
  user: User;
  orderItems: OrderItem[];
}

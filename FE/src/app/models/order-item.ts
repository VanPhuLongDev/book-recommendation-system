import {OrderDetail} from './order-detail';
import {Book} from './book';

export interface OrderItem {
  id?: number;
  price?: number;
  amount?: number;
  orderDetail?: OrderDetail;
  book: Book;
}

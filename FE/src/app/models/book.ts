import {Category} from './category';

export interface Book {
  id?: number;
  name?: string;
  avatar?: string;
  description?: string;
  price?: number;

  author?: string;
  coverForm?: string;
  publisher?: string;
  supplier?: string;
  
  moreInformation?: any;

  amount?: number;
  category: Category;
  category1?: number;
  category2?: number;
  category3?: number;
  numberRating?: number;
}

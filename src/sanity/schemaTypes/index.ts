import { type SchemaTypeDefinition } from 'sanity';
import menproduct from './menproduct';
import womenproduct from './womenproduct';
import order from './order';
import customer from './customer';
import cart from './cart';
import cartItems from './cartItems';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [menproduct, womenproduct, cart, customer, order, cartItems]
}

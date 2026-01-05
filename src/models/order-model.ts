export interface Order {
  id: number;
  productId: number;
  quantity: number;
}

export const orders: Order[] = [
  {
    id: 1,
    productId: 1,
    quantity: 2,
  },
  {
    id: 2,
    productId: 2,
    quantity: 1,
  },
  {
    id: 3,
    productId: 3,
    quantity: 3,
  },
];

// Mendefinisikan interface untuk objek Order
export interface Order {
  id: number; // ID unik pesanan
  productId: number; // ID produk yang dipesan
  quantity: number; // Jumlah produk yang dipesan
}

// Array yang menyimpan data pesanan awal
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

// Mendefinisikan interface untuk objek Product
export interface Product {
  id: number;
  name: string;
  price: number;
}

// Array yang menyimpan data produk awal
export const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
  },
];

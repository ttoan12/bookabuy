export class Order {
  id: string;
  userId: string;
  totalPrice: number;
  createdAt: Date;

  user: {
    name: string;
    address: string;
    phone: string;
    email?: string;
  };

  products: {
    bookId: string;
    name: string;
    author: string;
    unit: number;
    unitPrice: number;
    price: number;
  }[];
}

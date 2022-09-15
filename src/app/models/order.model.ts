export class Order {
  id: string;
  totalPrice: string;
  createdAt: Date;

  user: {
    userId: string;
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

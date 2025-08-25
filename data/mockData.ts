
import { Product, Sale } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Espresso', sku: 'CF-001', category: 'Coffee', price: 2.50, stock: 100, imageUrl: 'https://picsum.photos/seed/espresso/200' },
  { id: '2', name: 'Latte', sku: 'CF-002', category: 'Coffee', price: 3.50, stock: 100, imageUrl: 'https://picsum.photos/seed/latte/200' },
  { id: '3', name: 'Cappuccino', sku: 'CF-003', category: 'Coffee', price: 3.50, stock: 80, imageUrl: 'https://picsum.photos/seed/cappuccino/200' },
  { id: '4', name: 'Americano', sku: 'CF-004', category: 'Coffee', price: 3.00, stock: 120, imageUrl: 'https://picsum.photos/seed/americano/200' },
  { id: '5', name: 'Croissant', sku: 'PT-001', category: 'Pastry', price: 2.75, stock: 50, imageUrl: 'https://picsum.photos/seed/croissant/200' },
  { id: '6', name: 'Muffin', sku: 'PT-002', category: 'Pastry', price: 2.25, stock: 60, imageUrl: 'https://picsum.photos/seed/muffin/200' },
  { id: '7', name: 'Bagel', sku: 'PT-003', category: 'Pastry', price: 3.00, stock: 40, imageUrl: 'https://picsum.photos/seed/bagel/200' },
  { id: '8', name: 'Iced Tea', sku: 'DR-001', category: 'Drinks', price: 2.75, stock: 90, imageUrl: 'https://picsum.photos/seed/icedtea/200' },
  { id: '9', name: 'Orange Juice', sku: 'DR-002', category: 'Drinks', price: 3.25, stock: 70, imageUrl: 'https://picsum.photos/seed/juice/200' },
  { id: '10', name: 'Sandwich', sku: 'FD-001', category: 'Food', price: 6.50, stock: 30, imageUrl: 'https://picsum.photos/seed/sandwich/200' },
  { id: '11', name: 'Salad', sku: 'FD-002', category: 'Food', price: 7.50, stock: 25, imageUrl: 'https://picsum.photos/seed/salad/200' },
  { id: '12', name: 'Water Bottle', sku: 'DR-003', category: 'Drinks', price: 1.50, stock: 200, imageUrl: 'https://picsum.photos/seed/water/200' },
];

export const MOCK_SALES: Sale[] = [
  { id: 'S1', date: '2023-10-20', items: [{...MOCK_PRODUCTS[0], quantity: 2}, {...MOCK_PRODUCTS[4], quantity: 1}], total: 7.75, cashier: 'Jane Doe' },
  { id: 'S2', date: '2023-10-21', items: [{...MOCK_PRODUCTS[1], quantity: 1}], total: 3.50, cashier: 'John Smith' },
  { id: 'S3', date: '2023-10-22', items: [{...MOCK_PRODUCTS[2], quantity: 1}, {...MOCK_PRODUCTS[5], quantity: 2}], total: 8.00, cashier: 'Jane Doe' },
  { id: 'S4', date: '2023-10-23', items: [{...MOCK_PRODUCTS[9], quantity: 2}, {...MOCK_PRODUCTS[8], quantity: 2}], total: 19.50, cashier: 'John Smith' },
  { id: 'S5', date: '2023-10-24', items: [{...MOCK_PRODUCTS[0], quantity: 5}], total: 12.50, cashier: 'Jane Doe' },
  { id: 'S6', date: '2023-10-25', items: [{...MOCK_PRODUCTS[6], quantity: 3}, {...MOCK_PRODUCTS[7], quantity: 3}], total: 17.25, cashier: 'Jane Doe' },
  { id: 'S7', date: '2023-10-26', items: [{...MOCK_PRODUCTS[10], quantity: 1}, {...MOCK_PRODUCTS[11], quantity: 1}], total: 9.00, cashier: 'John Smith' },
];

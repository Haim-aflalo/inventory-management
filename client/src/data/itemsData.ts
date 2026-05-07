export interface InventoryItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const mockInventory: InventoryItem[] = [
  { id: 'p1', name: 'Laptop Pro', price: 1200, quantity: 5 },
  { id: 'p2', name: 'Wireless Mouse', price: 25, quantity: 0 },
  { id: 'p3', name: 'Monitor 4K', price: 450, quantity: 2 },
  { id: 'p4', name: 'USB-C Cable', price: 15, quantity: 0 },


];

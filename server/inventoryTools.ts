import type { InventoryItem } from '../../types/Item.js';

export function calculateTotalValue(items: InventoryItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getOutOfStock(items: InventoryItem[]): InventoryItem[] {
  return items.filter((item) => item.quantity === 0);
}

import type { InventoryItem } from '../types/Item.js';

export function calculateTotalValue(items: InventoryItem[]): number {
  let totalValue = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  return totalValue;
}

export function getOutOfStock(items: InventoryItem[]): InventoryItem[] {
  const outOfStockList = items.filter((item) => item.quantity === 0);
  return outOfStockList;
}

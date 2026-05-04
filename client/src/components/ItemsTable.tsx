import { useState } from 'react';
import { mockInventory } from '../data/itemsData';
import type { InventoryItem } from '../data/itemsData';

function ItemsTable() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const totalItems = inventory.length;

  const outOfStockCount = inventory.filter(
    (item) => item.quantity === 0,
  ).length;

  const totalValue = inventory.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );

  function handleEditClick(item: InventoryItem) {
    setEditingItem(item);
    setName(item.name);
    setQuantity(item.quantity);
    setPrice(item.price);
  }

  function deleteItem(id: string) {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editingItem) return;

    setInventory((prev) =>
      prev.map((item) =>
        item.id === editingItem.id ? { ...item, name, quantity, price } : item,
      ),
    );
    setEditingItem(null);
  }

  return (
    <>
      <section className="items-table">
        <p>
          <strong>Total Items:</strong> ({totalItems}) |
          <strong> Out of Stock:</strong> ({outOfStockCount}) |
          <strong> Total Inventory Value:</strong> (${totalValue.toFixed(2)})
        </p>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>
                  <button onClick={() => handleEditClick(item)}>edit</button>
                  <button onClick={() => deleteItem(item.id)}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {editingItem && (
        <section className="item-form">
          <h3>Editing Item: {editingItem.id}</h3>
          <form onSubmit={handleSave}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Quantity"
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Price"
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingItem(null)}>
              Cancel
            </button>
          </form>
        </section>
      )}
    </>
  );
}

export default ItemsTable;

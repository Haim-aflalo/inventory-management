import { useState } from "react";
import type { InventoryItem } from "../data/itemsData";

interface ItemsTableProps {
  inventory: InventoryItem[];
  onDelete: (id: string) => void;
  onEdit: (item: InventoryItem) => void;
}

function ItemsTable({ inventory, onDelete, onEdit }: ItemsTableProps) {
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [name, setName] = useState("");
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

  function handleSave() {
    if (!editingItem) return;
    const updatedItem = { ...editingItem, name, quantity, price }; //ajpouter prev
    onEdit(updatedItem);
    setEditingItem(null);
  }

  return (
    <div className="table-container">
      <section className="items-table">
        <div className="table-infos">
          <p className="table-summary">
            <strong>Total Items:</strong> {totalItems} |
            <strong> Out of Stock:</strong> {outOfStockCount} |
            <strong> Total Inventory Value:</strong> {totalValue} $
          </p>
        </div>
        <table>
          <thead className="infos-header">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="infos-value">
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>
                  <button onClick={() => handleEditClick(item)}>edit</button>
                  <button onClick={() => onDelete(item.id)}>delete</button>
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
            <div className="button-group">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditingItem(null)}>
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}

export default ItemsTable;

//gerer les keys en liste
//ajouter destructuring
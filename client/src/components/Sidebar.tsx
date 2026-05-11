import { useState } from "react";
import type { InventoryItem } from "../data/itemsData";

interface SidebarProps {
  onAdd: (newItem: InventoryItem) => void;
}

function Sidebar({ onAdd }: SidebarProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleSubmit = () => {
    if (!name || price <= 0 || quantity < 0) {
      return;
      //setMessqge for the user
    }

    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name,
      price,
      quantity,
    };

    onAdd(newItem);

    setName("");
    setPrice(0);
    setQuantity(0);
    setFlag(false);
    //creer une finction de reset
  };
  return (
    <div className="sidebar-container">
      <button onClick={() => setFlag(true)}>Add Item</button>
      {flag && (
        <section className="item-form">
          <form onSubmit={handleSubmit}>
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
              <button type="submit">Add</button>
              <button type="button" onClick={() => setFlag(false)}>
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}

export default Sidebar;
//changer en components le form pour ajouter un element

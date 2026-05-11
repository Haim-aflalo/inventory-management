import { useState } from 'react';
import ItemsTable from '../components/ItemsTable';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { mockUsers } from '../data/usersData';
import { mockInventory } from '../data/itemsData';
import type { InventoryItem } from '../data/itemsData';
import type { User } from '../data/usersData';
import '../styles/Dashboard.css';

function DashboardPage() {
  const [items, setItems] = useState<InventoryItem[]>(mockInventory);
  const [search, setSearch] = useState('');
  const userId = localStorage.getItem('userId');
  const user: User | undefined = mockUsers.find((u) => u.id === userId);
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search),
  );
  const addItem = (newItem: InventoryItem) => {
    setItems((prev) => [...prev, newItem]);
  };
  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  const editItem = (updatedItem: InventoryItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  };
  return (
    <div className="dashboard-page">
      <Navbar setSearch={setSearch} user={user} />
      <div className="dashboard-content">
        <Sidebar onAdd={addItem} />
        <ItemsTable
          inventory={filteredItems}
          onDelete={deleteItem}
          onEdit={editItem}
        />
      </div>
    </div>
  );
}

export default DashboardPage;


//applique context sur les elements
//arrow function 
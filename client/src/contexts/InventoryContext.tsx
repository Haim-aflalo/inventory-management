import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

import { mockInventory } from '../data/itemsData';
import type { InventoryItem } from '../data/itemsData';

interface InventoryContextType {
  items: InventoryItem[];
  search: string;
  filteredItems: InventoryItem[];
  setSearch: (val: string) => void;
  addItem: (newItem: InventoryItem) => void;
  deleteItem: (id: string) => void;
  editItem: (updatedItem: InventoryItem) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(
  undefined,
);

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<InventoryItem[]>(mockInventory);
  const [search, setSearch] = useState('');

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
    <InventoryContext.Provider
      value={{
        items,
        filteredItems,
        search,
        setSearch,
        addItem,
        deleteItem,
        editItem,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context)
    throw new Error('useInventory must be used within InventoryProvider');
  return context;
};

export interface InventoryItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
interface ItemFormData {
  name: string;
  quantity: number;
  price: number;
}

interface ItemFormProps {
  closeForm: () => void;
  initialData?: InventoryItem | null;
}

export type { ItemFormData, ItemFormProps };

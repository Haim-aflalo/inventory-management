import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useInventory } from "../contexts/InventoryContext";
import type { InventoryItem } from "../data/itemsData";
import {
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import { itemFormStyles } from "../styles/muiStyle";
interface ItemFormData {
  name: string;
  quantity: number;
  price: number;
}

interface ItemFormProps {
  closeForm: () => void;
  initialData?: InventoryItem | null;
}

const ItemForm = ({ closeForm, initialData }: ItemFormProps) => {
  const { addItem, editItem } = useInventory();
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ItemFormData>();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ name: "", quantity: 0, price: 0 });
    }
  }, [initialData, reset]);

  const onSubmit: SubmitHandler<ItemFormData> = (data) => {
    if (isEditMode && initialData) {
      editItem({ id: initialData.id, ...data });
    } else {
      addItem({
        id: Date.now().toString(),//! This is a simple way to generate a unique ID. In a real app, you'd want something more robust.
        ...data,
      });
    }
    reset();
    closeForm();
  };

  return (
    <>
      <DialogTitle sx={itemFormStyles.dialogTitleStyle}>
        {isEditMode ? "Edit Product" : "Add New Product"}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Stack spacing={3} sx={itemFormStyles.stackStyle}>
            <TextField
              {...register("name", { required: "Name is required" })}
              label="Item Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              variant="outlined"
            />

            <TextField
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 0, message: "Cannot be negative" },
                valueAsNumber: true,
              })}
              label="Quantity"
              type="number"
              fullWidth
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
            />

            <TextField
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Cannot be negative" },
                valueAsNumber: true,
              })}
              label="Price ($)"
              type="number"
              slotProps={{ htmlInput: { step: "0.01" } }}
              fullWidth
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={closeForm} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ px: 4 }}
          >
            {isEditMode ? "Save Changes" : "Confirm Add"}
          </Button>
        </DialogActions>
      </form>
    </>
  );
};

export default ItemForm;


//learn mui with folders separate
import { useState } from 'react';
import { useInventory } from '../contexts/InventoryContext';
import ItemForm from './ItemForm';
import type { InventoryItem } from '../data/itemsData';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Box,
  Stack,
  Dialog,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';


const ItemsTable = () => {
  const { filteredItems, deleteItem } = useInventory();

  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const totalItems = filteredItems.length;
  const outOfStockCount = filteredItems.filter(
    (item) => item.quantity === 0,
  ).length;
  const totalValue = filteredItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Paper
        elevation={0}
        sx={{ p: 2, mb: 2, bgcolor: 'grey.50', borderRadius: 2 }}
      >
        <Typography variant="body1" sx={{ fontWeight: 500 ,mt:'5%',mb:'-5%' , textAlign:'center'}}>
          <Box component="span" sx={{ mr: 2 }}>
            <strong>Total Items:</strong> {totalItems}
          </Box>
          <Box component="span" sx={{ mr: 2, color: 'error.main' }}>
            <strong>Out of Stock:</strong> {outOfStockCount}
          </Box>
          <Box component="span">
            <strong>Total Value:</strong> {totalValue.toLocaleString()} $
          </Box>
        </Typography>
      </Paper>
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 2,
          width: '60%',
          margin: 'auto',
          mt: '5%',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="inventory table">
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                ID
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Name
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Quantity
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Price
              </TableCell>
              <TableCell
                sx={{ color: 'white', fontWeight: 'bold' }}
                align="center"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredItems.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { bgcolor: 'grey.50' },
                }}
              >
                <TableCell>{item.id}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell align="center">
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ justifyContent: 'center' }} 
                  >
                    <IconButton
                      color="primary"
                      onClick={() => setEditingItem(item)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => deleteItem(item.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={Boolean(editingItem)}
        onClose={() => setEditingItem(null)}
        fullWidth
        maxWidth="sm"
      >
        <ItemForm
          initialData={editingItem}
          closeForm={() => setEditingItem(null)}
        />
      </Dialog>
    </Box>
  );
};

export default ItemsTable;

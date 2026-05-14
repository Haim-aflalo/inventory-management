import { useState } from 'react';
import { Box, Drawer, Button, Divider, Dialog } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import ItemForm from './ItemForm';

const drawerWidth = 240;

const Sidebar = () => {
  const [displayForm, setDisplayForm] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#121212',
            color: 'white',
            borderRight: '1px solid rgba(255, 255, 255, 0.12)',
          },
        }}
      >
        <Box sx={{ height: 64 }} />

        <Box sx={{ overflow: 'auto', p: 2 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => setDisplayForm(true)}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              py: 1,
            }}
          >
            Add New Item
          </Button>
        </Box>

        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.12)' }} />
      </Drawer>

      <Dialog
        open={displayForm}
        onClose={() => setDisplayForm(false)}
        fullWidth
        maxWidth="sm"
      >
        <ItemForm closeForm={() => setDisplayForm(false)} />
      </Dialog>
    </Box>
  );
};

export default Sidebar;

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavBar } from './useNavBar';

export const NavBar = () => {
  const {
    handleAddUser,
    handleDeleteAllUsers,
    handleRefreshUsers,
    selectedUserForManagerChange,
    handleCancelManagerAssignment,
  } = useNavBar();

  const [isModalOpen, setModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddUserAndCloseModal = () => {
    handleAddUser(newUserName);
    setNewUserName('');
    handleCloseModal();
  };

  return (
    <>
      <AppBar position="static" sx={{ width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Organization Chart
          </Typography>
          {selectedUserForManagerChange && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancelManagerAssignment}
              sx={{ marginRight: 2 }}
            >
              Cancel Manager Assignment
            </Button>
          )}
          <Button
            variant="contained"
            color="success"
            startIcon={<RefreshIcon />}
            onClick={handleRefreshUsers}
            sx={{ marginRight: 2 }}
          >
            Refresh Users
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteAllUsers}
            sx={{ marginRight: 2 }}
          >
            Delete All Users
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
          >
            Add User
          </Button>
        </Toolbar>
      </AppBar>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Add New User
          </Typography>
          <TextField
            fullWidth
            label="Name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUserAndCloseModal}
            sx={{ mt: 2 }}
          >
            Add User
          </Button>
        </Box>
      </Modal>
    </>
  );
};

import React from 'react';
import { Typography, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { User } from '../../types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from '../../styles/OrgChart.module.css';
import { useUserCard } from './useUserCard';

interface UserCardProps {
  user: User;
  onHover: (userId: string | null) => void;
  isHovered: boolean;
}

export const UserCard = ({ user, onHover, isHovered }: UserCardProps) => {
  const {
    selectedUserForManagerChange,
    anchorEl,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleDelete,
    handleChangeManager,
    handleRemoveManager,
  } = useUserCard(user);

  const isManagerOfSelectedUser =
    selectedUserForManagerChange?.manager?.id === user.id;

  return (
    <div
      className={`${styles.orgNode} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={() => onHover(user.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Avatar className={styles.avatar}>
        {user.name.charAt(0).toUpperCase()}
      </Avatar>
      <div className={styles.text}>
        <Typography>{user.name}</Typography>
      </div>
      {isManagerOfSelectedUser ? (
        <IconButton
          className={styles.moreButton}
          size="small"
          onClick={handleRemoveManager}
        >
          <CloseIcon />
        </IconButton>
      ) : (
        <IconButton
          className={styles.moreButton}
          size="small"
          onClick={handleOpenContextMenu}
        >
          <MoreVertIcon />
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseContextMenu}
      >
        <MenuItem onClick={handleDelete}>Delete User</MenuItem>
        <MenuItem onClick={handleChangeManager}>Change Manager</MenuItem>
      </Menu>
    </div>
  );
};

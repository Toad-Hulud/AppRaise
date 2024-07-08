import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../types';
import {
  deleteUserAction,
  setSelectedUserForManagerChange,
  updateUserManagerAction,
} from '../../redux/slices/usersSlice/actions/userActions';
import { useState } from 'react';
import { RootState, AppDispatch } from '../../redux/store';

export const useUserCard = (user: User) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedUserForManagerChange = useSelector(
    (state: RootState) => state.users.selectedUserForManagerChange,
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseContextMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    dispatch(deleteUserAction(user.id));
    handleCloseContextMenu();
  };

  const handleChangeManager = () => {
    dispatch(setSelectedUserForManagerChange(user));
    handleCloseContextMenu();
  };

  const handleRemoveManager = () => {
    dispatch(
      updateUserManagerAction({
        id: selectedUserForManagerChange!.id,
        managerId: null,
      }),
    );
    dispatch(setSelectedUserForManagerChange(null));
  };

  return {
    selectedUserForManagerChange,
    anchorEl,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleDelete,
    handleChangeManager,
    handleRemoveManager,
  };
};

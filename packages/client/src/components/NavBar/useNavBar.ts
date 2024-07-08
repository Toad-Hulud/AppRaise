import { useSelector, useDispatch } from 'react-redux';
import {
  createUserAction,
  deleteAllUsersAction,
  loadUsersAction,
  setSelectedUserForManagerChange,
} from '../../redux/slices/usersSlice/actions/userActions';
import { AppDispatch, RootState } from '../../redux/store';

export const useNavBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users,
  );
  const selectedUserForManagerChange = useSelector(
    (state: RootState) => state.users.selectedUserForManagerChange,
  );

  const handleAddUser = (name: string) => {
    if (!name) return;
    dispatch(createUserAction({ name }));
  };

  const handleRefreshUsers = () => {
    dispatch(loadUsersAction());
  };

  const handleDeleteAllUsers = () => {
    dispatch(deleteAllUsersAction());
  };

  const handleCancelManagerAssignment = () => {
    dispatch(setSelectedUserForManagerChange(null));
  };

  return {
    users,
    loading,
    error,
    selectedUserForManagerChange,
    handleAddUser,
    handleDeleteAllUsers,
    handleRefreshUsers,
    handleCancelManagerAssignment,
  };
};

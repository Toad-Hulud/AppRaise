import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import {
  updateUserManagerAction,
  setSelectedUserForManagerChange,
} from '../../redux/slices/usersSlice/actions/userActions';

export const useOrgChart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedUserForManagerChange = useSelector(
    (state: RootState) => state.users.selectedUserForManagerChange,
  );

  const [hoveredUserId, setHoveredUserId] = useState<string | null>(null);

  const handleSelectNewManager = (newManagerId: string) => {
    if (selectedUserForManagerChange) {
      dispatch(
        updateUserManagerAction({
          id: selectedUserForManagerChange.id,
          managerId: newManagerId,
        }),
      );
      dispatch(setSelectedUserForManagerChange(null));
    }
  };

  return {
    selectedUserForManagerChange,
    hoveredUserId,
    handleSelectNewManager,
    setHoveredUserId,
  };
};

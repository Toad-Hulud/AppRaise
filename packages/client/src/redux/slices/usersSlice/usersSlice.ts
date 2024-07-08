import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types';
import {
  loadUsersAction,
  createUserAction,
  updateUserAction,
  updateUserManagerAction,
  deleteUserAction,
  deleteAllUsersAction,
  setSelectedUserForManagerChange,
} from './actions/userActions';

interface UsersState {
  users: User[];
  selectedUserForManagerChange: User | null;
  loading: boolean;
  error: { message: string; details: string | null } | null;
}

const initialState: UsersState = {
  users: [],
  selectedUserForManagerChange: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOAD USERS
      .addCase(
        loadUsersAction.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false;
          state.users = action.payload;
        },
      )
      .addCase(loadUsersAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as {
          message: string;
          details: string | null;
        };
      })
      .addCase(loadUsersAction.pending, (state) => {
        state.loading = false;
      })

      // SET SELECTED USER FOR MANAGER CHANGE
      .addCase(setSelectedUserForManagerChange, (state, action) => {
        state.selectedUserForManagerChange = action.payload;
      })

      // UPDATE USER MANAGER
      .addCase(updateUserManagerAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserManagerAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as {
          message: string;
          details: string | null;
        };
      })

      // CREATE USER
      .addCase(createUserAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as {
          message: string;
          details: string | null;
        };
      })

      // DELETE USER
      .addCase(deleteUserAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as {
          message: string;
          details: string | null;
        };
      })

      // UPDATE USER
      .addCase(updateUserAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as {
          message: string;
          details: string | null;
        };
      })

      // DELETE ALL USERS
      .addCase(deleteAllUsersAction.fulfilled, (state) => {
        state.loading = false;
        state.users = [];
      })
      .addCase(deleteAllUsersAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as {
          message: string;
          details: string | null;
        };
      })

      // PENDINGS
      .addMatcher(
        isAnyOf(
          loadUsersAction.pending,
          createUserAction.pending,
          updateUserAction.pending,
          updateUserManagerAction.pending,
          deleteUserAction.pending,
          deleteAllUsersAction.pending,
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          loadUsersAction.fulfilled,
          createUserAction.fulfilled,
          updateUserAction.fulfilled,
          updateUserManagerAction.fulfilled,
          deleteUserAction.fulfilled,
          deleteAllUsersAction.fulfilled,
        ),
        (state) => {
          state.loading = false;
          state.error = null;
        },
      );
  },
});

export default usersSlice.reducer;

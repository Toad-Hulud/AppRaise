import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { userRepositoryInstance as userRepository } from '../../../../repositories/userRepository';
import { RootState } from '../../../store';
import { User, UpdateManagerPayload } from '../../../../types';

export const loadUsersAction = createAsyncThunk<
  User[],
  void,
  { state: RootState }
>('users/loadUsers', async (_, { rejectWithValue }) => {
  try {
    const users = await userRepository.fetchUsers();
    return users;
  } catch (error: any) {
    return rejectWithValue({
      message: 'Failed to load users',
      details: error.response?.data.message || error.message,
    });
  }
});

export const createUserAction = createAsyncThunk<
  void,
  { name: string },
  { state: RootState }
>('users/createUser', async ({ name }, { dispatch, rejectWithValue }) => {
  try {
    await userRepository.createUser({ name });
    dispatch(loadUsersAction());
  } catch (error: any) {
    console.log({ error });
    return rejectWithValue({
      message: 'Failed to create user',
      details: error.response?.data.message || error.message,
    });
  }
});

export const updateUserAction = createAsyncThunk<
  void,
  { id: string; name: string },
  { state: RootState }
>(
  'users/changeUserName',
  async ({ id, name }, { dispatch, rejectWithValue }) => {
    try {
      await userRepository.updateUser(id, name);
      dispatch(loadUsersAction());
    } catch (error: any) {
      return rejectWithValue({
        message: 'Failed to update user',
        details: error.response?.data.message || error.message,
      });
    }
  },
);

export const updateUserManagerAction = createAsyncThunk<
  void,
  UpdateManagerPayload,
  { state: RootState }
>(
  'users/changeUserManager',
  async ({ id, managerId }, { dispatch, rejectWithValue }) => {
    try {
      await userRepository.updateUserManager(id, managerId);
      dispatch(loadUsersAction());
    } catch (error: any) {
      return rejectWithValue({
        message: 'Failed to update user manager',
        details: error.response?.data.message || error.message,
      });
    }
  },
);

export const deleteUserAction = createAsyncThunk<
  void,
  string,
  { state: RootState }
>('users/deleteUser', async (id, { dispatch, rejectWithValue }) => {
  try {
    await userRepository.deleteUser(id);
    dispatch(loadUsersAction());
  } catch (error: any) {
    return rejectWithValue({
      message: 'Failed to delete user',
      details: error.response?.data.message || error.message,
    });
  }
});

export const deleteAllUsersAction = createAsyncThunk<
  void,
  void,
  { state: RootState }
>('users/deleteAllUsers', async (_, { dispatch, rejectWithValue }) => {
  try {
    await userRepository.deleteAllUsers();
    dispatch(loadUsersAction());
  } catch (error: any) {
    return rejectWithValue({
      message: 'Failed to delete all users',
      details: error.response?.data.message || error.message,
    });
  }
});

export const setSelectedUserForManagerChange = createAction<User | null>(
  'users/setSelectedUserForManagerChange',
);

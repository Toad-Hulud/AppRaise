import axios from 'axios';
import { User } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const USERS_API_URL = API_URL + '/users';
class UserRepository {
  async fetchUsers(): Promise<User[]> {
    const response = await axios.get<User[]>(`${USERS_API_URL}`);
    return response.data;
  }

  async createUser({ name }: { name: string }): Promise<User> {
    const response = await axios.post<User>(`${USERS_API_URL}`, { name });
    return response.data;
  }

  async updateUser(id: string, name: string): Promise<void> {
    await axios.patch(`${USERS_API_URL}/${id}`, { name });
  }

  async updateUserManager(id: string, managerId: string | null): Promise<void> {
    await axios.patch(`${USERS_API_URL}/${id}/manager`, { managerId });
  }

  async deleteUser(id: string): Promise<void> {
    await axios.delete(`${USERS_API_URL}/${id}`);
  }

  async deleteAllUsers(): Promise<void> {
    await axios.delete(`${USERS_API_URL}`);
  }
}

export const userRepositoryInstance = new UserRepository();

export interface User {
  id: string;
  name: string;
  manager: User | null;
  subordinates: User[];
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export interface UpdateManagerPayload {
  id: string;
  managerId: string | null;
}

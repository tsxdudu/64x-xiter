export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  balance: number;
  createdAt: string;
}

export interface AuthState {
  user: Omit<User, 'password'> | null;
  isAuthenticated: boolean;
}
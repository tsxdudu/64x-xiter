import { AuthState, User } from '../types/auth';

const AUTH_KEY = 'gaming_store_auth';
const USERS_KEY = 'gaming_store_users';

export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  if (!users) return [];
  return JSON.parse(users);
};

export const saveUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find((user) => user.email === email);
};

export const validateCredentials = (email: string, password: string): User | null => {
  const user = findUserByEmail(email);
  if (!user || user.password !== password) return null;
  return user;
};

export const saveAuth = (user: User) => {
  const { password, ...userWithoutPassword } = user;
  const auth: AuthState = {
    user: userWithoutPassword,
    isAuthenticated: true,
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
};

export const getAuth = (): AuthState => {
  const auth = localStorage.getItem(AUTH_KEY);
  if (!auth) return { user: null, isAuthenticated: false };
  return JSON.parse(auth);
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY);
};
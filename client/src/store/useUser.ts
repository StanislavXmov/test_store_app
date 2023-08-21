import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
};

export interface User {
  id: number;
  email: string;
  password: string;
  role: Roles
};

interface UserStore {
  user: User | null;
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUser = create<UserStore>()(devtools(immer((set) => ({
  user: null,
  isAuth: false,
  setIsAuth: (value) => set(state => {
    state.isAuth = value;
  }),
  setUser: (user) => set(state => {
    state.user = user;
  }),
  logout: () => set(state => {
    state.user = null;
    state.isAuth = false;
  }),
}))));

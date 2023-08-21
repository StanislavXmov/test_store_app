import { Roles, User } from '../store/useUser';
import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';

export const registration = async (formData: FormData) => {
  const { data } = await $host.post<{token: string}>('api/user/registration', formData);
  localStorage.setItem('token', data.token);
  return jwt_decode<User>(data.token);
}

export const login = async (nickname: string, password: string) => {
  const { data } = await $host.post<{token: string}>('api/user/login', {nickname, password});
  localStorage.setItem('token', data.token);
  return jwt_decode<User>(data.token);
}

export const check = async () => {
  const { data } = await $authHost.get<{token: string}>('api/user/auth');
  
  localStorage.setItem('token', data.token);
  return jwt_decode<User>(data.token);
}
import React, { useState } from 'react';
import { AuthContext } from './authContext';
import { storage } from '../utils/storage.ts';
import { axios } from '../lib/axios';

export interface AuthContextValues {
  user: any;
  login: (props: LoginProps) => any;
  isLoggedIn: () => boolean;
  logout: () => void;
  register: (props: RegisterProps) => void;
  resetPassword: (props: ResetPasswordProps) => void;
}
export interface AuthProviderProps {
  children: React.ReactNode;
}
export interface RegisterProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface LoginProps {
  email: string;
  password: string;
}
export interface ResetPasswordProps {
  password: string;
  confirmPassword: string;
  token: string;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }: LoginProps) => {
    try {
      const { data } = await axios.post('auth/login', { email, password });
      if (data) {
        setUser(data?.user);
        storage.setToken(data?.token);
        storage.setRefreshToken(data?.refreshToken);
      }
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const register = async ({
    email,
    password,
    firstName,
    lastName,
  }: RegisterProps) => {
    try {
      const res = await axios.post('/api/register', {
        email,
        password,
        firstName,
        lastName,
      });
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      storage.clearTokens();
      await axios.post('/api/logout');
    } catch (err) {
      console.log(err);
    }
  };

  const resetPassword = async ({
    password,
    confirmPassword,
    token,
  }: ResetPasswordProps) => {
    try {
      await axios.post('/api/reset-password', {
        password,
        confirmPassword,
        token,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        resetPassword,
        isLoggedIn: () => !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

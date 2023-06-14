import React, { useState } from 'react';
import axios from 'axios';
import { AuthContext } from './authContext';
import { storage } from '../utils/storage.ts';

export interface AuthContextValues {
  user: any;
  login: (props: LoginProps) => void;
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
      const res = await axios.post('/api/login', { email, password });
      setUser(res.data.user);
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
      await axios.post('/api/logout');
      setUser(null);
      storage.clearTokens();
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
      value={{ user, login, logout, register, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

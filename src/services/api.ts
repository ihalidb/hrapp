import axios from 'axios';

const API_URL = 'http://localhost:3001';

export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'manager' | 'employee';
  department: string;
  title: string;
  employeeId: string;
}

export const api = {
  async login(email: string, password: string): Promise<User | null> {
    try {
      const response = await axios.get(`${API_URL}/users?email=${email}`);
      const user = response.data[0];
      
      if (user && user.password === password) {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
      return null;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },

  async register(userData: Omit<User, 'id'>): Promise<User | null> {
    try {
      const response = await axios.post(`${API_URL}/users`, userData);
      const { password: _, ...userWithoutPassword } = response.data;
      return userWithoutPassword;
    } catch (error) {
      console.error('Registration error:', error);
      return null;
    }
  },

  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const response = await axios.get(`${API_URL}/users?email=${email}`);
      return response.data.length > 0;
    } catch (error) {
      console.error('Email check error:', error);
      return false;
    }
  },

  async getAllPersonnel(): Promise<Omit<User, 'password'>[]> {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data.map((user: User) => {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    } catch (error) {
      console.error('Get personnel error:', error);
      return [];
    }
  }
}; 
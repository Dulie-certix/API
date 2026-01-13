import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phone?: string;
}

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phone?: string;
}

export interface UpdateUserData extends Partial<CreateUserData> {
  _id: string;
}

class UserService {
  private baseURL = `${API_BASE_URL}/users`;

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await axios.get<User[]>(this.baseURL);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const response = await axios.get<User>(`${this.baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  }

  async createUser(userData: CreateUserData): Promise<User> {
    try {
      const response = await axios.post<User>(this.baseURL, userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async updateUser(userData: UpdateUserData): Promise<User> {
    try {
      const { _id, ...updateData } = userData;
      const response = await axios.put<User>(`${this.baseURL}/${_id}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/${id}`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }
}

export const userService = new UserService();
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginCredentials, RegisterData } from '../types/auth';

const USERS_KEY = '@FloodMonitor:users';
const CURRENT_USER_KEY = '@FloodMonitor:currentUser';

export const authService = {
  async register(data: RegisterData): Promise<User> {
    try {
      const users = await this.getUsers();
      const existingUser = users.find(user => user.email === data.email);

      if (existingUser) {
        throw new Error('Email já cadastrado');
      }

      const newUser: User = {
        id: Math.random().toString(),
        name: data.name,
        email: data.email,
      };

      await AsyncStorage.setItem(
        USERS_KEY,
        JSON.stringify([...users, newUser])
      );

      return newUser;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const users = await this.getUsers();
      const user = users.find(
        user => user.email === credentials.email
      );

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  async updateUserLocation(
    userId: string,
    location: User['location']
  ): Promise<User> {
    try {
      const users = await this.getUsers();
      const userIndex = users.findIndex(user => user.id === userId);

      if (userIndex === -1) {
        throw new Error('Usuário não encontrado');
      }

      const updatedUser = {
        ...users[userIndex],
        location,
      };

      users[userIndex] = updatedUser;

      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      console.error('Error updating user location:', error);
      throw error;
    }
  },

  async getUsers(): Promise<User[]> {
    try {
      const usersJson = await AsyncStorage.getItem(USERS_KEY);
      return usersJson ? JSON.parse(usersJson) : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  },
}; 
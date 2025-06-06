export interface User {
  id: string;
  name: string;
  email: string;
  location?: {
    city?: string;
    neighborhood?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
} 
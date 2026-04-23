export interface AuthUser {
  id: string;
  name: string;
  email: string;
  photoURL: string;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

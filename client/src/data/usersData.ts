type UserRole = 'Admin' | 'User';

export interface User {
  readonly id: string;
  username: string;
  password: string;
  role: UserRole;
}


type UserRole = 'Admin' | 'User';

export interface User {
  readonly id: number;
  username: string;
  role: UserRole;
}

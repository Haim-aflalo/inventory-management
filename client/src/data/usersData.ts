type UserRole = 'Admin' | 'User';

export interface User {
  readonly id: string;
  username: string;
  password: string;
  role: UserRole;
}

export const mockUsers: User[] = [
  { id: 'A1', username: 'alice_dev', password: 'alice123', role: 'Admin' },
  { id: 'U1', username: 'bob_manager', password: 'bob123', role: 'User' },
  { id: 'U2', username: 'charlie_guest', password: 'charlie123', role: 'User' },
];

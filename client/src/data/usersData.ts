type UserRole = 'Admin' | 'User';

export interface User {
  readonly id: string;
  username: string;
  role: UserRole;
}

export const mockUsers: User[] = [
  { id: 'A1', username: 'alice_dev', role: 'Admin' },
  { id: 'U1', username: 'bob_manager', role: 'User' },
  { id: 'U2', username: 'charlie_guest', role: 'User' },
];

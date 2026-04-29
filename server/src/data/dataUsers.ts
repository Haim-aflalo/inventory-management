import type { User } from '../types/user.js';

export const mockUsers: User[] = [
  { id: 1, username: 'alice_dev', role: 'Admin' },
  { id: 2, username: 'bob_manager', role: 'User' },
  { id: 3, username: 'charlie_guest', role: 'User' },
];

type UserRole = "Admin" | "User";

export interface User {
  readonly id: number;
  username: string;
  password: string;
  role: UserRole;
}

export const mockUsers: User[] = [
  { id: 1, username: "alice_dev", password:"alice123",role: "Admin" },
  { id: 2, username: "bob_manager", password:"bob123",role: "User" },
  { id: 3, username: "charlie_guest", password:"charlie123",role: "User" },
];

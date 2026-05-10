import type { User } from '../types/user.js';
import { writeUser, readUsers } from '../dal/userDal.js';

const addUserService = async (newUser: User) => {
  try {
    const users = await readUsers();
    const existingUser = users.find(
      (u: User) => u.username === newUser.username,
    );

    if (existingUser) {
      throw new Error('This username is already taken');
    }

    return await writeUser(newUser);
  } catch (error) {
    console.error('Service Error (Add):', error);
    throw error;
  }
};

const checkUserService = async (username: string, password: string) => {
  try {
    const users = await readUsers();

    const user = users.find(
      (u: User) => u.username === username && u.password === password,
    );
    if (!user) {
      throw new Error('User not found or password incorrect');
    }
    return 'User logged in';
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

export { addUserService, checkUserService };

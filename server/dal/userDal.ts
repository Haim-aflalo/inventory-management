import { readFile, writeFile } from '../utils/fileTools.js';
import type { User } from '../types/user.js';

const writeUser = async (newUser: User) => {
  try {
    return await writeFile('./data/dataUsers.json', newUser);
  } catch (error) {
    console.error(error);
  }
};
const readUsers = async () => {
  try {
    return await readFile('./data/dataUsers.json');
  } catch (error) {
    console.error(error);
  }
};

export { writeUser, readUsers };

import fs from 'node:fs/promises';
import type { User } from '../types/user.js';
import type { InventoryItem } from '../types/Item.js';

const readFile = async (path: string) => {
  return JSON.parse(await fs.readFile(path, 'utf-8'));
};

const writeFile = async (path: string, data: User | InventoryItem) => {
  const fileContent = await readFile(path);
  fileContent.push(data);
  return await fs.writeFile(
    path,
    JSON.stringify(fileContent, null, 2),
    'utf-8',
  );
};

export { readFile, writeFile };

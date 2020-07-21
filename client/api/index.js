import dotenv from 'dotenv';

dotenv.config();
export async function findColumnsByUserId(userId = 'agrajak') {
  const response = await fetch(`${process.env.HOST}/api/todos?id=${userId}`, {
    method: 'GET',
  });
  const { success, message, payload } = await response.json();
  if (success) {
    const { columns } = payload;
    return columns;
  }
  throw new Error(message);
}

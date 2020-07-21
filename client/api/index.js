export async function findColumnsByUserId(userId = 'agrajak') {
  const response = await fetch(`/api/todos?id=${userId}`, {
    method: 'GET',
  });
  const { success, message, payload } = await response.json();
  if (success) {
    const { columns } = payload;
    return columns;
  }
  throw new Error(message);
}

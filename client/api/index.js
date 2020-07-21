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

export async function findNotesByColumnId(columnId) {
  const response = await fetch(`/api/columns?id=${columnId}`, {
    method: 'GET',
  });
  const { success, message, payload } = await response.json();
  if (success) {
    const { notes } = payload;
    return notes;
  }
  throw new Error(message);
}

export async function createNote(columnId, text) {
  const body = JSON.stringify({
    columnId, text, writerId: 'agrajak',
  });
  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  const { success, message, payload } = await response.json();
  if (success) {
    const { note } = payload;
    return note;
  }
  throw new Error(message);
}
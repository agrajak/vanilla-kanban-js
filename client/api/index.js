const headers = {
  'Content-Type': 'application/json',
};

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
    headers,
    body,
  });
  const { success, message, payload } = await response.json();
  if (success) {
    const { note } = payload;
    return note;
  }
  throw new Error(message);
}

export async function editNote(id, text) {
  const response = await fetch('/api/notes/text', {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      id, text,
    }),
  });
  const { success, message } = await response.json();
  if (success) return;
  throw new Error(message);
}

export async function deleteNote(id) {
  const response = await fetch(`/api/notes?id=${id}`, {
    method: 'DELETE',
  });
  const { success, message } = await response.json();
  if (success) return;
  throw new Error(message);
}

export async function moveNote(id, columnId, position) {
  const body = JSON.stringify({
    id, columnId, position,
  });
  const response = await fetch('/api/notes/position', {
    method: 'PUT',
    body,
    headers,
  });
  const { success, message } = await response.json();
  if (success) return;
  throw new Error(message);
}

export async function deleteColumn(columnId) {
  const response = await fetch(`/api/columns?id=${columnId}`, {
    method: 'DELETE',
  });
  const { success, message } = await response.json();
  if (success) {
    return;
  }
  throw new Error(message);
}

export async function updateColumnTitle(columnId, title) {
  const response = await fetch('/api/columns/title', {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      id: columnId,
      title,
    }),
  });
  const { success, message } = await response.json();
  if (success) {
    return;
  }
  throw new Error(message);
}

export async function createColumn(title, ownerId, writerId) {
  const response = await fetch('/api/columns', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      ownerId,
      writerId,
    }),
  });
  const { success, message, payload } = await response.json();
  if (success) {
    const { column } = payload;
    return column;
  }
  throw new Error(message);
}

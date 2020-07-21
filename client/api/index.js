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

// export async function createNote(note, columnId) {
//   const response = await fetch('/api/notes', {
//     method: 'POST',
//     body: {
//       // TODO
//     },
//   });
//   const { success, message, payload } = await response.json();
//   if (success) {
//     const { note: createdNote } = payload;
//     return createdNote;
//   }
//   throw new Error(message);
// }

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

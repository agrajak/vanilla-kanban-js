/* eslint-disable no-restricted-syntax */
import Note from 'Components/Note/note';
import Todo from 'Components/Todo/todo';
import Column from 'Components/Column/column';
import '@/global.css';
import { findColumnsByUserId, findNotesByColumnId } from './api';

const body = document.querySelector('body');
const todo = new Todo();
todo.mount(body);

(async function loadTodos() {
  const columns = await findColumnsByUserId('agrajak');
  for (const { id, title, position } of columns) {
    const column = new Column(todo, { id, title, position });
    const notes = await findNotesByColumnId(id);
    for (const note of notes) {
      column.addNote(new Note(note));
    }
    todo.addColumn(column);
  }
}());

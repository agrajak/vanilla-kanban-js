/* eslint-disable no-restricted-syntax */
import {
  Header, Todo, Column, Note, Menu,
} from 'Components';
import { findColumnsByUserId, findNotesByColumnId } from '@/api';
import '@/global.css';

const root = document.getElementById('root');
const header = new Header(root);
const todo = new Todo();
const menu = new Menu();
header.mount(root);
todo.mount(root);
menu.mount(root);

(async function loadTodos() {
  const columns = await findColumnsByUserId('agrajak');
  for (const { id, title, position } of columns) {
    const column = new Column(todo, { id, title, position });
    const notes = await findNotesByColumnId(id);
    for (const note of notes) {
      column.addNote(new Note(column, note));
    }
    todo.addColumn(column);
  }
}());

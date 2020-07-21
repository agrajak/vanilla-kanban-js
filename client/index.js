import Todo from 'Components/Todo/todo';
import Column from 'Components/Column/column';
import '@/global.css';
import Note from 'Components/Note/note';
import { findColumnsByUserId } from './api';

const body = document.querySelector('body');
const todo = new Todo();
todo.mount(body);

async function loadTodos() {
  const columns = await findColumnsByUserId('agrajak');
  columns.forEach(({ id, title, position }) => {
    todo.addColumn(new Column(todo, { id, title, position }));
  });
}
loadTodos();

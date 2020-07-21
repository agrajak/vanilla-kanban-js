import { Header, Todo, Column } from 'Components';
import '@/global.css';
import { findColumnsByUserId } from './api';

const body = document.querySelector('body');
const header = new Header();
const todo = new Todo();
header.mount(document.getElementById('root'));
todo.mount(document.getElementById('root'));

// async function loadTodos() {
//   const columns = await findColumnsByUserId('agrajak');
//   columns.forEach(({ id, title, position }) => {
//     todo.addColumn(new Column(todo, { id, title, position }));
//   });
// }
// loadTodos();

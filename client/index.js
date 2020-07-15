import Todo from './components/Todo/todo';
import Column from './components/Column/column';
import './global.css';

const body = document.querySelector('body');
const todo = new Todo();
todo.mount(body);
todo.addColumn(new Column(todo, { title: 'hello' }));
todo.addColumn(new Column(todo, { title: 'hello2' }));

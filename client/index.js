import Todo from './components/Todo';
import Column from './components/Column';
import './global.css';

const body = document.querySelector('body');
const todo = new Todo();
todo.mount(body);
todo.addColumn(new Column({ title: 'hello' }));
todo.addColumn(new Column({ title: 'hello2' }));

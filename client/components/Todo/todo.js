import Component from '../component';
import './todo.css';
import Modal from '../Modal/modal';

export default class Todo extends Component {
  constructor(parent, props) {
    super(parent, props, 'main-container');
    this.columns = [];

    this.columnModal = new Modal(this);
    this.columnModal.mount(this.$);
  }

  mount(element) {
    super.mount(element);
  }

  addColumn(column) {
    this.columns.push(column);
    column.mount(this.$);
  }

  render() {
    return '';
  }
}

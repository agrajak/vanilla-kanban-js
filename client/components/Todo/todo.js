import Component from '../component';
import './todo.css';
import ColModal from '../Modal/Sections/col-modal';
import NoteModal from '../Modal/Sections/note-modal';

export default class Todo extends Component {
  constructor(parent, props) {
    super(parent, props, 'main-container');
    this.columns = [];

    this.columnModal = new ColModal(this);
    this.columnModal.mount(this.$);

    this.noteModal = new NoteModal(this);
    this.noteModal.mount(this.$);
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

import Component from 'Components/Component/component';
import EventController from '@/event-controller';
import ColModal from '../Modal/Sections/col-modal';
import NoteModal from '../Modal/Sections/note-modal';
import ColumnAddBtn from '../Column/Sections/columnAddBtn';
import './todo.css';

export default class Todo extends Component {
  constructor(parent) {
    super(parent, null, 'main-container');
    this.columns = [];

    this.columnModal = new ColModal(this);
    this.noteModal = new NoteModal(this);
    this.addColumnBtn = new ColumnAddBtn(this);

    this.mouseController = new EventController(this);
  }

  findColumnById(id) {
    return this.columns.find((x) => x.props.id === id);
  }

  mount(element) {
    this.columnModal.mount(this.$);
    this.noteModal.mount(this.$);
    this.addColumnBtn.mount(this.$);
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

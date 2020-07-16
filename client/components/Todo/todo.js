import Component from '../component';
import './todo.css';
import ColModal from '../Modal/Sections/col-modal';
import NoteModal from '../Modal/Sections/note-modal';
import Note from '../Note/note';

export default class Todo extends Component {
  constructor(parent) {
    super(parent, null, 'main-container');
    this.columns = [];

    this.columnModal = new ColModal(this);
    this.noteModal = new NoteModal(this);
    this.ghostNote = new Note(this, { isGhost: true });

    this.selectedNote = null;
    this.isNoteDragging = false; // 위의 선택된 노트가 드래그 중인지 나타내는 Boolean

    this.$.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.$.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.$.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onMouseDown() {
    if (!this.selectedNote) return;
    this.isNoteDragging = true;
  }

  onMouseUp() {
    if (!this.selectedNote) return;
    this.ghostNote.close();
    this.isNoteDragging = false;
    this.selectedNote = null;
  }

  onMouseMove(event) {
    if (!this.selectedNote) return;
    if (!this.isNoteDragging) return;
    const { pageX: offsetX, pageY: offsetY } = event;
    this.ghostNote.open();
    this.ghostNote.move(offsetX, offsetY);
  }

  mount(element) {
    this.columnModal.mount(this.$);
    this.noteModal.mount(this.$);
    this.ghostNote.mount(element);
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

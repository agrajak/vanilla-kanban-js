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

    this.$.addEventListener('mousedown', () => {
      if (!this.selectedNote) return;
      this.isNoteDragging = true;
    });
    this.$.addEventListener('mouseup', () => {
      if (!this.selectedNote) return;
      this.ghostNote.hide();
      this.isNoteDragging = false;
      this.selectedNote = null;
    });
    this.$.addEventListener('mousemove', (event) => {
      if (!this.selectedNote) return;
      if (!this.isNoteDragging) return;
      this.ghostNote.show();
      const { pageX: offsetX, pageY: offsetY } = event;
      this.ghostNote.move(offsetX, offsetY);
    });
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

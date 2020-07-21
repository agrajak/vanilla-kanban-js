import Component from 'Components/Component/component';
import './todo.css';
import ColModal from '../Modal/Sections/col-modal';
import NoteModal from '../Modal/Sections/note-modal';
import GhostNote from '../Note/Sections/ghost-note';
import FakeNote from '../Note/Sections/fake-note';
import ColumnAddBtn from '../Column/Sections/columnAddBtn';

export default class Todo extends Component {
  constructor(parent) {
    super(parent, null, 'main-container');
    this.columns = [];

    this.columnModal = new ColModal(this);
    this.noteModal = new NoteModal(this);

    this.ghostNote = new GhostNote(this); // 떠다니는 노트
    this.fakeNote = new FakeNote(this); // 예상 배치 공간에 자리하는 노트

    this.addColumnBtn = new ColumnAddBtn(this);

    this.selectedNote = null;
    this.isNoteDragging = false; // 위의 선택된 노트가 드래그 중인지 나타내는 Boolean

    this.$.addEventListener('mousedown', this.onMouseDown.bind(this), {
      capture: false,
    });
    this.$.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.$.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onMouseDown(event) {
    if (!this.selectedNote) return;
    this.isNoteDragging = true;
    const {
      clientX: x, clientY: y, offsetX: ox, offsetY: oy,
    } = event;
    const rect = event.target.getBoundingClientRect();
    const { x: _x, y: _y } = rect;
    const { offsetLeft: left, offsetTop: top } = event.target;
    if (event.target.offsetParent.classList.contains('note')) {
      this.ghostNote.offsetX = ox + left;
      this.ghostNote.offsetY = oy + top;
    } else {
      this.ghostNote.offsetX = x - _x;
      this.ghostNote.offsetY = y - _y;
    }
    this.ghostNote.disguise(this.selectedNote);
    this.fakeNote.disguise(this.selectedNote);
  }

  onMouseUp() {
    if (!this.selectedNote) return;
    this.ghostNote.close();
    this.fakeNote.close();
    this.selectedNote.open();
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
    this.fakeNote.mount(element);
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

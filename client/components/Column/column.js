import Component from '../component';
import NoteForm from '../Note/Sections/note-form';
import './column.css';
import Note from '../Note/note';

export default class Column extends Component {
  constructor(parent, props) {
    super(parent, props, 'col');

    this.$colTitle = this.$.querySelector('.col-title');
    this.$colBody = this.$.querySelector('.col-body');
    this.$colEditBtn = this.$.querySelector('.col-edit');
    this.$noteFormBtn = this.$.querySelector('.note-plus');
    this.notes = [];

    this.title = props.title;
    this.setTitle();
    this.noteForm = new NoteForm(this);

    this.$noteFormBtn.addEventListener('click', this.noteForm.show);
    this.$colEditBtn.addEventListener('click', this.parent.columnModal.show);
  }

  setTitle() {
    this.$colTitle.innerText = this.title;
  }

  showNoteForm = () => {
    this.$noteForm.classList.remove('hidden');
  }

  addNote({ title, content = '' }) {
    const note = new Note(this, { title, content, writer: 'agrajak' });
    this.notes.push(note);
    note.mount(this.$colBody);
  }

  removeNote(note) {
    const { $ } = note;
    this.notes = this.notes.filter((x) => x !== $);
    this.$colBody.removeChild($);
  }

  mount(element) {
    this.noteForm.mount(this.$colBody);
    super.mount(element);
  }

  render() {
    return `
      <div class="col-header">
        <div class="note-counter">3</div>
        <div class="col-title">
            해야할 일
        </div>
        <div class="col-btns">
            <button class="note-plus">+</button>
            <button class="col-edit">...</button>
        </div>
      </div>
      <div class="col-body">
        <!-- 노트 생성폼 -->
      </div>
    `;
  }
}

import Note from '../Note';
import Component from '..';
import './column.css';

export default class Column extends Component {
  constructor(parent, props) {
    super(parent, props, 'col');

    this.$colTitle = this.$.querySelector('.col-title');
    this.$noteForm = this.$.querySelector('.note-form');
    this.$noteFormBtn = this.$.querySelector('.note-plus');
    this.$noteAddBtn = this.$.querySelector('.add-btn');
    this.$colBody = this.$.querySelector('.col-body');
    this.$colEditBtn = this.$.querySelector('.col-edit');
    this.$noteForm = this.$.querySelector('.note-form');


    this.notes = [];
    this.columnModal = this.parent.columnModal;

    this.$noteFormBtn.addEventListener('click', this.showNoteForm);
    this.$noteAddBtn.addEventListener('click', this.appendNote);
    this.$colEditBtn.addEventListener('click', this.columnModal.show);
  }

  get title() {
    return this.$colTitle.innerText;
  }

  set title(value) {
    this.$colTitle.innerText = value;
  }

  get noteText() {
    return this.$noteForm.querySelector('.note-text').innerText;
  }

  set noteText(value) {
    this.$noteForm.querySelector('.note-text').innerText = value;
  }

  showNoteForm = () => {
    this.$noteForm.classList.remove('hidden');
  }

  appendNote = () => {
    this.addNote(new Note(this, { title: this.noteText, writer: 'agrajak' }));
  }

  addNote(note) {
    this.notes.push(note);
    note.mount(this.$colBody);
  }

  mount(element) {
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
        <div class="note-form hidden">
          <div class="note-form-body">
            <textarea class="note-text"></textarea>
          </div>
          <div class="note-form-footer">
            <button class="add-btn">Add</button>
            <button class="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    `;
  }
}

import { Component, Note } from 'Components';
import { createNote } from '@/api';
import './note-form.css';

export default class NoteForm extends Component {
  constructor(parent) {
    super(parent, null, 'note-form');
    this.$noteAddBtn = this.$.querySelector('.add-btn');
    this.$noteCancelBtn = this.$.querySelector('.cancel-btn');
    this.$noteText = this.$.querySelector('.note-text');
    this.$noteAddBtn.addEventListener('click', this.onNoteAddBtnClick.bind(this));
    this.$noteCancelBtn.addEventListener('click', this.onNoteCancelBtnClick.bind(this));
    this.$noteText.addEventListener('input', this.inputText.bind(this));
    this.$noteAddBtn.disabled = true;
  }

  onNoteAddBtnClick() {
    const { value: text } = this.$noteText;
    createNote(this.parent.props.id, text)
      .then((noteObj) => {
        this.parent.prependNote(new Note(this.parent, noteObj));
        this.resetFormContents();
        this.close();
      });
  }

  onNoteCancelBtnClick() {
    this.close();
  }

  resetFormContents() {
    this.$noteText.value = '';
  }

  inputText(event) {
    if (event.target.value !== '') {
      this.$noteAddBtn.disabled = false;
    }
    if (event.target.value === '') {
      this.$noteAddBtn.disabled = true;
    }
  }

  mount(element) {
    element.prepend(this.$);
    this.close();
  }

  render() {
    return `
      <div class="note-form-body">
        <textarea class="note-text"></textarea>
      </div>
      <div class="note-form-footer">
        <button class="add-btn">Add</button>
        <button class="cancel-btn">Cancel</button>
      </div>
        `;
  }
}

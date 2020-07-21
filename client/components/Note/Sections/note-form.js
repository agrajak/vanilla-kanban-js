import { Note } from 'Components';
import { parseNoteText } from '@/utils';
import { createNote } from '@/api';
import Component from '../../Component/component';
import './note-form.css';

export default class NoteForm extends Component {
  constructor(parent) {
    super(parent, null, 'note-form');
    this.$noteAddBtn = this.$.querySelector('.add-btn');
    this.$noteText = this.$.querySelector('.note-text');
    this.$noteAddBtn.addEventListener('click', this.onNoteAddBtnClick.bind(this));
  }

  onNoteAddBtnClick() {
    const { value: text } = this.$noteText;
    createNote(this.parent.props.id, text)
      .then((noteObj) => {
        const note = new Note(this.parent, noteObj);
        this.parent.prependNote(note);
        this.resetFormContents();
        this.close();
      });
  }

  resetFormContents() {
    this.$noteText.value = '';
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

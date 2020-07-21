import Component from 'Components/Component/component';
import { parseNoteText } from '@/utils';
import './note-form.css';

export default class NoteForm extends Component {
  constructor(parent) {
    super(parent, null, 'note-form');
    this.$noteAddBtn = this.$.querySelector('.add-btn');
    this.$noteText = this.$.querySelector('.note-text');
    this.$noteAddBtn.addEventListener('click', () => {
      this.parent.addNote(parseNoteText(this.$noteText.value));
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

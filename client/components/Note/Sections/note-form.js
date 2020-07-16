import Component from '../../component';
import './note-form.css';

export default class NoteForm extends Component {
  constructor(parent) {
    super(parent, null, 'note-form');
    this.$noteAddBtn = this.$.querySelector('.add-btn');
    this.$noteText = this.$.querySelector('.note-text');
    this.$noteAddBtn.addEventListener('click', () => {
      this.parent.addNote(this.getFormContents());
      this.resetFormContents();
      this.close();
    });
  }

  resetFormContents() {
    this.$noteText.value = '';
  }

  getFormContents() {
    const text = this.$noteText.value.split('\n');
    const title = text[0];
    text.shift(0);
    const content = text.join('\n');
    return {
      title, content,
    };
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

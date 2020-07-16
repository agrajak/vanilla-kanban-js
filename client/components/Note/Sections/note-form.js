import Component from '../../component';
import './note-form.css';

export default class NoteForm extends Component {
  constructor(parent, props) {
    super(parent, props, 'note-form');
    this.$noteAddBtn = this.$.querySelector('.add-btn');
    this.$noteText = this.$.querySelector('.note-text');
    this.$noteAddBtn.addEventListener('click', () => {
      this.parent.addNote(this.getFormContents());
      this.resetFormContents();
      this.hide();
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
    super.mount(element);
    this.hide();
  }

  show = () => {
    this.$.classList.remove('hidden');
  }

  hide = () => {
    this.$.classList.add('hidden');
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

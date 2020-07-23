import { Component } from 'Components';
import './note-form.css';

export default class NoteForm extends Component {
  constructor(parent) {
    super(parent, null, 'note-form');
    this.$noteAddBtn = this.$.querySelector('.add-btn');
    this.$noteCancelBtn = this.$.querySelector('.cancel-btn');
    this.$noteText = this.$.querySelector('.note-text');
    this.$noteAddBtn.addEventListener('click', this.onSubmit.bind(this));
    this.$noteCancelBtn.addEventListener('click', this.onNoteCancelBtnClick.bind(this));
    this.$noteText.addEventListener('input', this.onInput.bind(this));
    this.$noteAddBtn.disabled = true;
    this.callback = null;
  }

  onSubmit() {
    const { value: text } = this.$noteText;
    this.resetFormContents();
    this.close();
    this.callback({ text });
  }

  open(callback) {
    super.open();
    this.callback = callback;
  }

  onNoteCancelBtnClick() {
    this.close();
  }

  resetFormContents() {
    this.$noteText.value = '';
  }

  onInput(event) {
    const { value } = event.target;
    if (value.length > 0 && value.length < 500) {
      this.$noteAddBtn.disabled = false;
      return;
    }
    this.$noteAddBtn.disabled = true;
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

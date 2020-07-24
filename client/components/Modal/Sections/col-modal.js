import { Modal } from 'Components';
import '../modal.css';

export default class ColModal extends Modal {
  constructor() {
    super();

    this.content = `
      <label for="title" class="label-col-name">
          Column name
      </label>
      <input name="title" type="text" class="new-title"/>
    `;

    this
      .setContent(this.content)
      .setBtnName('Update column');

    this.$modalSubmitBtn = this.$.querySelector('.modal-submit-btn');
    this.$newTitle = this.$.querySelector('.new-title');

    this.$newTitle.addEventListener('input', this.onInput.bind(this));
    this.$modalSubmitBtn.addEventListener('click', this.submit.bind(this));
  }

  open({ title }, callback) {
    super.open(callback);
    this
      .setNewTitle(title)
      .setTitle(`Edit ${title}`);
    return this;
  }

  setNewTitle(value) {
    this.$newTitle.value = value;
    return this;
  }

  onInput(event) {
    const { value } = event.target;
    if (value.length > 0 && value.length < 500) {
      this.$modalSubmitBtn.disabled = false;
      this.$modalSubmitBtn.classList.add('active');
      return;
    }
    this.$modalSubmitBtn.classList.remove('active');
    this.$modalSubmitBtn.disabled = true;
  }

  async submit() {
    const { value } = this.$newTitle;
    this.resolve({ value });
    this
      .close()
      .setNewTitle('');
  }
}

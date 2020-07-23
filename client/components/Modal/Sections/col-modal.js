import { Modal } from 'Components';
import '../modal.css';
import { updateColumnTitle } from '@/api';

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
    this.$modalSubmitBtn.addEventListener('click', this.submit.bind(this));
    this.$newTitle = this.$.querySelector('.new-title');
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

  async submit() {
    const { value } = this.$newTitle;
    this.resolve({ value });
    this
      .close()
      .setNewTitle('');
  }
}

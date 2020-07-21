import Modal from 'Components/Modal/modal';
import 'Components/Modal/modal.css';
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

  open() {
    super.open();
    this
      .setNewTitle(this.$attach.title)
      .setTitle(`Edit ${this.$attach.title}`);
    return this;
  }

  setNewTitle(value) {
    this.$newTitle.value = value;
    return this;
  }

  async submit() {
    await updateColumnTitle(this.$attach.props.id, this.$newTitle.value);
    this
      .$attach.setTitle(this.$newTitle.value);
    this
      .close()
      .setNewTitle('');
  }
}

import Modal from '../modal';
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

    this.setContent(this.content);
    this.setBtnName('Update column');

    this.$modalSubmitBtn = this.$.querySelector('.modal-submit-btn');
    this.$modalSubmitBtn.addEventListener('click', this.submit);
    this.$newTitle = this.$.querySelector('.new-title');

    this.$column = null;
  }

  show = (column) => () => {
    this.$.style.display = 'block';
    super.setTitle(`Edit ${column.title}`);
    this.$column = column;
  }

  submit = () => {
    this.$column.setTitle(this.$newTitle.value);
    this.$newTitle.value = '';
    this.close();
  }
}

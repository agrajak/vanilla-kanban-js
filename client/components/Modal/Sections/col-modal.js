import Modal from '../modal';
import '../modal.css';

export default class ColModal extends Modal {
  constructor() {
    super();

    this.content = `
      <label for="title" class="label-col-name">
          Column name
      </label>
      <input name="title" type="text"/>
    `;

    super.setTitle('Edit 제목');
    super.setContent(this.content);
    super.setBtnName('Update column');
  }
}

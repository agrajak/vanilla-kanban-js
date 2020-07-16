import Modal from '../modal';
import '../modal.css';

export default class NoteModal extends Modal {
  constructor() {
    super();

    this.content = `
      <label for="note" class="label-note-content">
        Note
      </label>
      <textarea name="note"></textarea>
    `;

    super.setTitle('Edit note');
    super.setContent(this.content);
    super.setBtnName('Save note');
  }
}

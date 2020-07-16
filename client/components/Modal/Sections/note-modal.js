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

    this.setTitle('Edit note');
    this.setContent(this.content);
    this.setBtnName('Save note');
  }
}

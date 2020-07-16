import Modal from '../modal';
import '../modal.css';

export default class NoteModal extends Modal {
  constructor() {
    super();

    this.content = `
      <label for="note" class="label-note-content">
        Note
      </label>
      <textarea name="note" class="new-note"></textarea>
    `;

    this.setTitle('Edit note');
    this.setContent(this.content);
    this.setBtnName('Save note');

    this.$modalSubmitBtn = this.$.querySelector('.modal-submit-btn');
    this.$modalSubmitBtn.addEventListener('click', this.submit);
    this.$newNote = this.$.querySelector('.new-note');

    this.$note = null;
  }

  show = (note) => () => {
    super.show();
    this.$note = note;
  }

  submit = () => {
    this.$note.content = this.$newNote.value;
    this.$newNote.value = '';
    this.close();
  }
}

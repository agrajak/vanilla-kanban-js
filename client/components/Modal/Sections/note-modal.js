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

    this
      .setTitle('Edit note')
      .setContent(this.content)
      .setBtnName('Save note');

    this.$modalSubmitBtn = this.$.querySelector('.modal-submit-btn');
    this.$modalSubmitBtn.addEventListener('click', this.submit.bind(this));
    this.$newNote = this.$.querySelector('.new-note');

    this.$note = null;
  }

  open(note) {
    return () => {
      super.open();
      this.$note = note;
    };
  }

  submit() {
    this.$note.setContent(this.$newNote.value);
    this.$newNote.value = '';
    this.close();
  }
}

import { Modal } from 'Components';
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
    this.$newNote = this.$.querySelector('.new-note');

    this.$modalSubmitBtn.addEventListener('click', this.submit.bind(this));
  }

  setNewNote(value) {
    this.$newNote.value = value;
    return this;
  }

  open({ title, content }, callback) {
    super.open(callback);
    this.setNewNote(`${title}\n${content}`);
    return this;
  }

  async submit() {
    const text = this.$newNote.value;
    this.resolve({ text });
    this
      .setNewNote('')
      .close();
    return this;
  }
}

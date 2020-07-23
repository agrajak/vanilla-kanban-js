import { Component, NoteForm, Note } from 'Components';
import './column.css';
import { deleteNote, createNote } from '@/api';

export default class Column extends Component {
  /**
   * @param {Component} parent
   * @param {{title: string}} props
   */
  constructor(parent, props) {
    super(parent, props, 'col');

    const { title } = this.props;

    this.$colTitle = this.$.querySelector('.col-title');
    this.$colBody = this.$.querySelector('.col-body');
    this.$noteFormBtn = this.$.querySelector('.note-plus-btn');
    this.$removeBtn = this.$.querySelector('.col-delete-btn');
    this.$counter = this.$.querySelector('.note-counter');
    this.notes = [];

    this.setTitle(title);
    this.noteForm = new NoteForm(this);

    this.$removeBtn.addEventListener('click', this.removeCol.bind(this));
    this.$noteFormBtn.addEventListener('click', this.onNoteFormAddBtnClick.bind(this));
    this.$colTitle.addEventListener('dblclick', this.onColEditBtnClick.bind(this));
  }

  updateCounter() {
    this.$counter.innerText = this.notes.length;
  }

  onNoteFormAddBtnClick() {
    this.noteForm.open((values) => {
      const { text } = values;
      const { id } = this.props;
      createNote(id, text)
        .then((noteObj) => {
          this.prependNote(new Note(this, noteObj));
        });
    });
  }

  setTitle(value) {
    this.title = value;
    this.$colTitle.innerText = value;
    return this;
  }

  addNote(note) {
    this.notes.push(note);
    note.mount(this.$colBody);
    this.updateCounter();
    return this;
  }

  removeCol() {
    this.parent.confirmModal
      .attach(this)
      .open();
  }

  prependNote(note) {
    this.notes.unshift(note);
    const noteForm = this.noteForm.$;
    this.$colBody.insertBefore(note.$, noteForm.nextSibling);
    this.updateCounter();
  }

  insertNote(note, position) {
    this.notes.splice(position, 0, note);
    const noteForm = this.noteForm.$;
    let node = noteForm.nextElementSibling;
    for (let i = 0; i < position; i += 1) {
      node = node.nextElementSibling;
    }
    this.$colBody.insertBefore(note.$, node);
    this.updateCounter();
  }

  onColEditBtnClick() {
    this.parent.columnModal
      .attach(this)
      .open();
  }

  findNoteById(id) {
    return this.notes.find((x) => x.props.id === id);
  }

  async removeNote(note, onlyDOM = false) {
    if (!onlyDOM) {
      await deleteNote(note.props.id);
    }
    const { $ } = note;
    this.notes = this.notes.filter((x) => x !== note);
    this.$colBody.removeChild($);
    this.updateCounter();
  }

  mount(element) {
    this.noteForm.mount(this.$colBody);
    element.insertBefore(this.$, element.lastChild);
  }

  render() {
    return `
      <div class="col-header">
        <div class="note-counter">3</div>
        <div class="col-title">
            해야할 일
        </div>
        <div class="col-btns">
            <button class="note-plus-btn">+</button>
            <button class="col-delete-btn">x</button>
        </div>
      </div>
      <div class="col-body">
        <!-- 노트 생성폼 -->
      </div>
    `;
  }
}

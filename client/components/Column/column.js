import Component from 'Components/Component/component';
import NoteForm from 'Components/Note/Sections/note-form';
import './column.css';
import Note from 'Components/Note/note';

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

    this.notes = [];

    this.setTitle(title);
    this.noteForm = new NoteForm(this);

    this.$removeBtn.addEventListener('click', this.removeCol.bind(this));
    this.$noteFormBtn.addEventListener('click', this.noteForm.open.bind(this.noteForm));
    this.$colTitle.addEventListener('dblclick', this.onColEditBtnClick.bind(this));
  }

  setTitle(value) {
    this.title = value;
    this.$colTitle.innerText = value;
    return this;
  }

  addNote(noteObj) {
    const note = new Note(this, noteObj);
    this.notes.push(note);
    note.mount(this.$colBody);
    return this;
  }

  removeCol() {
    this.parent.$.removeChild(this.$);
  }

  prependNote(noteObj) {
    const note = new Note(this, noteObj);
    this.notes.unshift(note);

    const noteForm = this.noteForm.$;
    noteForm.parentNode.insertBefore(note.$, noteForm.nextSibling);
  }

  onColEditBtnClick() {
    this.parent.columnModal
      .attach(this)
      .open();
  }

  removeNote(note) {
    const { $ } = note;
    this.notes = this.notes.filter((x) => x !== $);
    this.$colBody.removeChild($);
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

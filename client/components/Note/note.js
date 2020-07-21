import Component from 'Components/Component/component';
import './note.css';

export default class Note extends Component {
  /**
   * 노트 객체를 생성합니다.
   * @param {*} parent
   * @param {{title: string, content: string, writer: string} props
   */
  constructor(parent, props = {}) {
    super(parent, props, 'note');

    this.$noteTitle = this.$.querySelector('.note-title');
    this.$noteContent = this.$.querySelector('.note-content');
    this.$noteWriter = this.$.querySelector('.note-writer');
    this.$noteDeleteBtn = this.$.querySelector('.note-delete-btn');

    this.noteModal = this.getRootComponent().noteModal;

    this.$.addEventListener('dblclick', this.onDblClick.bind(this));
    this.$.addEventListener('mouseover', this.onMouseOver.bind(this));
    this.$.addEventListener('mouseout', this.onMouseOut.bind(this));
    this.$noteDeleteBtn.addEventListener('click', this.onNoteDeleteBtnClick.bind(this));

    const {
      title, content, writer,
    } = this.props;

    this
      .setTitle(title)
      .setContent(content)
      .setWriter(writer);
  }

  onDblClick() {
    this.noteModal
      .attach(this)
      .open();
  }

  onMouseOver() {
    if (this.getRootComponent().isNoteDragging) {
      const { fakeNote, selectedNote } = this.getRootComponent();

      selectedNote.close();
      if (fakeNote.isVisible() && this.isHigherThan(fakeNote)) {
        this.parent.$colBody.insertBefore(fakeNote.$, this.$.nextSibling);
      } else {
        this.parent.$colBody.insertBefore(fakeNote.$, this.$);
      }
      fakeNote.open();
    } else {
      this.getRootComponent().selectedNote = this;
      this.$.classList.add('selected');
    }
  }

  onMouseOut() {
    this.$.classList.remove('selected');
    if (this.getRootComponent().isNoteDragging) return;
    this.getRootComponent().selectedNote = null;
  }

  onNoteDeleteBtnClick() {
    this.parent.removeNote(this);
  }

  setTitle(value) {
    this.title = value;
    this.$noteTitle.innerText = value;
    return this;
  }

  setContent(value) {
    this.content = value;
    this.$noteContent.innerText = value;
    return this;
  }

  setWriter(value) {
    this.writer = value;
    this.$noteWriter.innerText = value;
    return this;
  }

  disguise(note) {
    this.$.innerHTML = note.$.innerHTML;
  }

  isVisible() {
    return !this.$.classList.contains('hidden');
  }

  mount(element) {
    super.mount(element);
  }

  render() {
    return `
            <div class="note-header">
                <div class="note-icon"><img/></div>
                <div class="note-title">제목</div>
                    <button class="note-delete-btn">X</button>
                </div>
                <div class="note-body">
                    <div class="note-content">내용</div>
                <div class="note-footer">Added by <span class="note-writer"></span></div>  
            </div>
        `;
  }
}

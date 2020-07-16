import Component from '../component';
import './note.css';

export default class Note extends Component {
  /**
   * 노트 객체를 생성합니다.
   * @param {*} parent
   * @param {{title: string, content: string, writer: string, isGhost: boolean}} props
   */
  constructor(parent, props) {
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
      title, content, writer, isGhost = false,
    } = this.props;

    if (isGhost) {
      this.$.classList.add('ghost');
      this.close();
    }
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
    this.getRootComponent().selectedNote = this;
    this.$.classList.add('selected');
  }

  onMouseOut() {
    if (this.getRootComponent().isNoteDragging) return;
    this.getRootComponent().selectedNote = null;
    this.$.classList.remove('selected');
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

  move(x, y) {
    this.$.setAttribute('style', `left: ${x}; top: ${y};`);
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

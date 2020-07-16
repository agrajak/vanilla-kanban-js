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

    this.$.addEventListener('dblclick', this.noteModal.show);
    this.$noteDeleteBtn.addEventListener('click', () => {
      this.parent.removeNote(this);
    });
    this.$.addEventListener('mouseover', () => {
      this.getRootComponent().selectedNote = this;
      this.$.classList.add('selected');
    });
    this.$.addEventListener('mouseout', () => {
      if (this.getRootComponent().isNoteDragging) return;
      this.getRootComponent().selectedNote = null;
      this.$.classList.remove('selected');
    });

    const {
      title, content, writer, isGhost = false,
    } = this.props;

    if (isGhost) {
      this.$.classList.add('ghost');
      this.hide();
    }
    this.title = title;
    this.content = content;
    this.writer = writer;
  }

  show() {
    this.$.classList.remove('hidden');
  }

  hide() {
    this.$.classList.add('hidden');
  }

  set title(value) {
    this.$noteTitle.innerText = value;
  }

  set content(value) {
    this.$noteContent.innerText = value;
  }

  set writer(value) {
    this.$noteWriter.innerText = value;
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

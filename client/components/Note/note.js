import Component from '../component';
import './note.css';

export default class Note extends Component {
  constructor(parent, props) {
    super(parent, props, 'note');

    this.$noteTitle = this.$.querySelector('.note-title');
    this.$noteContent = this.$.querySelector('.note-content');
    this.$noteWriter = this.$.querySelector('.note-writer');
    this.$noteDeleteBtn = this.$.querySelector('.note-delete-btn');

    this.noteModal = this.parent.parent.noteModal;

    this.$.addEventListener('click', this.noteModal.show);
    this.$noteDeleteBtn.addEventListener('click', () => {
      this.parent.removeNote(this);
    });

    const { title, content, writer } = this.props;
    this.title = title;
    this.content = content;
    this.writer = writer;
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

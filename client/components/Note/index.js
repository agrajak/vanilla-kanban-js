import Component from '..';

export default class Note extends Component {
  constructor(props) {
    super(props, 'note');

    this.$noteTitle = this.$.querySelector('.note-title');
    this.$noteContent = this.$.querySelector('.note-content');
    this.$noteWriter = this.$.querySelector('.note-writer');
  }

  get title() {
    return this.$noteTitle.innerText;
  }

  set title(value) {
    this.$noteTitle.innerText = value;
  }

  get content() {
    return this.$noteContent.innerText;
  }

  set content(value) {
    this.$noteContent.innerText = value;
  }

  get writer() {
    return this.$noteWriter.innerText;
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

import { Component } from 'Components';
import '../modal.css';

export default class ConfirmModal extends Component {
  constructor(parent, props) {
    super(parent, props, 'modal');

    this.$cancelBtn = this.$.querySelector('.cancel-btn');
    this.$confirmBtn = this.$.querySelector('.confirm-btn');

    this.$cancelBtn.addEventListener('click', this.close.bind(this));
    this.$confirmBtn.addEventListener('click', this.delColumn.bind(this));
    this.callback = null;
    this.close();
  }

  mount(element) {
    super.mount(element);
  }

  open(callback) {
    super.open();
    this.callback = callback;
  }

  resolve(values) {
    this.callback(values);
    this.close();
  }

  async delColumn() {
    this.resolve();
  }

  render() {
    return `
    <div class="modal-container">
        <div class="confirm-content">정말 삭제하시겠습니까?</div>
        <div class="confirm-footer">
            <button class="confirm-btn active">확인</button>
            <button class="cancel-btn active">취소</button>
        </div>
    </div>
    <div class="modal-bg"></div>
        `;
  }
}

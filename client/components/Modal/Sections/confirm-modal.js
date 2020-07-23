import { Component } from 'Components';
import '../modal.css';
import { deleteColumn } from '@/api';

export default class ConfirmModal extends Component {
  constructor(parent, props) {
    super(parent, props, 'modal');

    this.$cancelBtn = this.$.querySelector('.cancel-btn');
    this.$confirmBtn = this.$.querySelector('.confirm-btn');

    this.$cancelBtn.addEventListener('click', this.close.bind(this));
    this.$confirmBtn.addEventListener('click', this.delColumn.bind(this));
    this.close();

    this.$attach = null;
  }

  mount(element) {
    super.mount(element);
  }

  attach(value) {
    this.$attach = value;
    return this;
  }

  async delColumn() {
    await deleteColumn(this.$attach.props.id);
    this.parent.$.removeChild(this.$attach.$);
    this.close();
  }

  render() {
    return `
    <div class="modal-container">
        <div class="modal-content">정말 삭제하시겠습니까?</div>
        <div class="modal-footer">
            <button class="cancel-btn">취소</button>
            <button class="confirm-btn">확인</button>
        </div>
    </div>
    <div class="modal-bg"></div>
        `;
  }
}

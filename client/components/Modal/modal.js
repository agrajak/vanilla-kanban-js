import Component from '../component';
import './modal.css';

export default class Modal extends Component {
  constructor(parent, props) {
    super(parent, props, 'modal');

    this.$modalCloseBtn = this.$.querySelector('.modal-closer');
    this.$modalCloseBtn.addEventListener('click', this.close);
  }

  mount(element) {
    super.mount(element);
  }

  show = () => {
    this.$.style.display = 'block';
  }

  close = () => {
    this.$.style.display = 'none';
  }


  render() {
    return `
    <div class="modal-container">
        <div class="modal-header">
            <div class="modal-title">제목</div>
            <button class="modal-closer">X</button>
        </div>
        <div class="modal-content">
        <label for="name" class="label-col-name">
            Column name
        </label>
        <input name="title" type="text"/>
        </div>
        <div class="modal-footer">
            <button>Submit</button>
        </div>
    </div>
    <div class="modal-bg"></div>
        `;
  }
}

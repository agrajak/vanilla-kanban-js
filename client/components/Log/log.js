import Component from 'Components/Component/component';
import './log.css';

export default class Log extends Component {
  constructor(parent) {
    super(parent, null, 'menu');

    this.closeMenu();
    this.menuCloseBtn = this.$.querySelector('.menu-close-btn');
    this.menuCloseBtn.addEventListener('click', this.closeMenu.bind(this));
  }

  closeMenu() {
    this.$.classList.add('close');
  }

  render() {
    return `
    <div class="menu-header">
      <div class="menu-title">제목</div>
      <button class="menu-close-btn">X</button>
    </div>
    <div class="activity">Activiy</div>
    <ul class="log-list">
      <li class="log">
        <div class="avatar">
          <img/>
        </div>
        <div class="log-body">
          <div class="log-content"></div>
          <div class="log-footer"></div>
        </div>
      </li>
    </ul>
        `;
  }
}

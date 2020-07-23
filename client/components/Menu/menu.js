import { Component } from 'Components';
import './menu.css';

export default class Menu extends Component {
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
      <div class="menu-title">&#9776; Menu</div>
      <button class="menu-close-btn">X</button>
    </div>
    <div class="activity">Activtiy</div>
    <div class="log-list"></div>
        `;
  }
}

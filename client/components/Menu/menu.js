/* eslint-disable no-restricted-syntax */
import { Component, Log } from 'Components';
import './menu.css';
import { findLogsByUserId } from '@/api';

export default class Menu extends Component {
  constructor(parent) {
    super(parent, null, 'menu');

    this.$logList = this.$.querySelector('.log-list');

    this.closeMenu();
    this.menuCloseBtn = this.$.querySelector('.menu-close-btn');
    this.menuCloseBtn.addEventListener('click', this.closeMenu.bind(this));
  }

  closeMenu() {
    this.$.classList.add('close');
  }

  async mount(element) {
    const logs = await findLogsByUserId('agrajak');
    for (const {
      id, ownerId, writerId, type, action, target, source,
    } of logs) {
      const log = new Log(this, {
        id, ownerId, writerId, type, action, target, source,
      });
      log.mount(this.$logList);
    }
    super.mount(element);
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

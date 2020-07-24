/* eslint-disable no-restricted-syntax */
import { Component, Log } from 'Components';
import './header.css';
import { findLogsByUserId } from '@/api';

export default class Header extends Component {
  constructor(parent) {
    super(parent, null, 'header');

    this.menuBtn = this.$.querySelector('.menu-btn');
    this.menuBtn.addEventListener('click', this.openMenu.bind(this));
  }

  async openMenu() {
    const logs = await findLogsByUserId('agrajak');
    const $logList = this.parent.querySelector('.log-list');
    $logList.innerHTML = '';
    for (const {
      id, ownerId, writerId, type, action, target, source, createdAt,
    } of logs) {
      const log = new Log(this, {
        id, ownerId, writerId, type, action, target, source, createdAt,
      });
      log.mount($logList);
    }

    this.parent.querySelector('.menu-bg').classList.remove('hidden');
    this.parent.querySelector('.menu-container').classList.replace('close', 'open');
  }

  render() {
    return `
            <div class="title">
                TODO 서비스
            </div>
            <div class="menu-btn">
              &#9776; Menu
            </div>
        `;
  }
}

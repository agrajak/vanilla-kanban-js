import { Component } from 'Components';

export default class Log extends Component {
  constructor(parent) {
    super(parent, null, 'log');
  }

  render() {
    return `
      <div class="avatar">
        <img/>
      </div>
      <div class="log-body">
        <div class="log-content"></div>
        <div class="log-footer"></div>
      </div>
    `;
  }
}

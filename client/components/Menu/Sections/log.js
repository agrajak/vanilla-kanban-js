import { Component } from 'Components';

function parseTimeStamp(time) {
  const past = +new Date(time);
  const now = +new Date();
  let diff = parseInt((now - past) / 1000, 10) - 9 * 60 * 60; // UTC timezone

  if (diff < 60) {
    return `${diff} seconds ago`;
  }
  diff = parseInt(diff / 60, 10);
  if (diff < 60) {
    return `${diff} minutes ago`;
  }
  diff = parseInt(diff / 60, 10);
  if (diff < 24) {
    return `${diff} hours ago`;
  }
  diff = parseInt(diff / 24, 10);
  return `${diff} days ago`;
}

export default class Log extends Component {
  constructor(parent, props) {
    super(parent, props, 'log');

    this.$writer = this.$.querySelector('.log-writer');
    this.$action = this.$.querySelector('.log-action');
    this.$type = this.$.querySelector('.log-type');
    this.$source = this.$.querySelector('.log-from');
    this.$target = this.$.querySelector('.log-to');
    this.$createdAt = this.$.querySelector('.log-created-at');

    const {
      writerId, type, action, target, source, createdAt,
    } = this.props;

    this.setWriter(writerId)
      .setAction(action)
      .setType(type)
      .setTarget(target)
      .setSource(source)
      .setCreatedAt(createdAt);
  }

  setWriter(value) {
    this.writer = value;
    this.$writer.innerText = `@${value}`;
    return this;
  }

  setAction(value) {
    this.action = value;
    this.$action.innerText = value;
    return this;
  }

  setType(value) {
    this.type = value;
    this.$type.innerText = value;
    return this;
  }

  setTarget(value) {
    this.target = value;
    const { target } = this.props;
    if (!target) {
      return this;
    }
    this.$target.innerHTML = `<span class='none'>to</span> ${value}`;
    return this;
  }

  setSource(value) {
    this.source = value;
    if (!this.source) {
      return this;
    }
    const { target } = this.props;
    if (!target) {
      this.$source.innerText = value;
      return this;
    }
    this.$source.innerHTML = `<span class='none'>from</span> ${value}`;
    return this;
  }

  setCreatedAt(value) {
    this.createdAt = value;
    this.$createdAt.innerText = parseTimeStamp(value);
    return this;
  }

  render() {
    return `
      <div class="avatar">
        <img/>
      </div>
      <div class="log-body">
        <div class="log-content">
          <span class="log-writer highlight"></span>
          <span class="log-action"></span>
          <span class="log-type"></span>
          <span class="log-from highlight"></span>
          <span class="log-to highlight"></span>
        </div>
        <div class="log-footer">
          <span class="log-created-at"></span>
        </div>
      </div>
    `;
  }
}

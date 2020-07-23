import { Component } from 'Components';

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
    } = props;

    this.setWriter(writerId)
      .setAction(action)
      .setType(type)
      .setTarget(target)
      .setSource(source)
      .setCreatedAt(createdAt);
  }

  setWriter(value) {
    this.writer = value;
    this.$writer.innerText = value;
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
    this.$target.innerText = value;
    return this;
  }

  setSource(value) {
    this.source = value;
    this.$source.innerText = value;
    return this;
  }

  setCreatedAt(value) {
    this.createdAt = value;
    this.$createdAt.innerText = value;
    return this;
  }

  render() {
    return `
      <div class="avatar">
        <img/>
      </div>
      <div class="log-body">
        <div class="log-content">
          <span class="log-writer"></span>
          <span class="log-action"></span>
          <span class="log-type"></span>
          <span class="log-from"></span>
          <span class="log-to"></span>
        </div>
        <div class="log-footer">
          <span class="log-created-at"></span>
        </div>
      </div>
    `;
  }
}

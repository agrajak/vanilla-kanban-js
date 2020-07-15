export default class Component {
  constructor(props, className) {
    this.parent = null;
    this.$ = document.createElement('div');
    this.$.innerHTML = this.render();
    this.$.classList.add(className);
    this.props = props;
  }

  mount(element) {
    element.append(this.$);
  }

  render() {
    return '';
  }
}

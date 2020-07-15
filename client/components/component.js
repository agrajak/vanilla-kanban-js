export default class Component {
  constructor(parent=null, props, className) {
    this.parent = parent;
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

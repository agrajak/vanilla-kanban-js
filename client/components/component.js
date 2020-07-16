export default class Component {
  constructor(parent = null, props, className) {
    this.parent = parent;
    this.$ = document.createElement('div');
    this.$.innerHTML = this.render();
    this.$.classList.add(className);
    this.props = props;
  }

  mount(element) {
    element.append(this.$);
  }

  open() {
    this.$.classList.remove('hidden');
    return this;
  }

  close() {
    this.$.classList.add('hidden');
    return this;
  }

  /**
   * Root Component(ToDo)를 반환합니다. 바로 할아버지 컴포넌트에 접근할 수 있습니다.
   * @returns {Component}
   */
  getRootComponent() {
    let root = this;
    while (root.parent !== null) {
      root = root.parent;
    }
    return root;
  }

  /**
   * 현재 컴포넌트가 몇 번째 자식 노드인지 반환합니다. 숨겨진 노드는 세지 않습니다.
   * @returns {Number}
   */
  getComponentIndex() {
    const { parentElement } = this.$;
    let idx = 0;
    parentElement.children.some((node) => {
      if (node === this) {
        return true;
      }
      if (!node.classList.contains('hidden') && !node.classList.contains('fake')) {
        idx += 1;
      }
      return false;
    });
    return idx;
  }

  render() {
    return '';
  }
}

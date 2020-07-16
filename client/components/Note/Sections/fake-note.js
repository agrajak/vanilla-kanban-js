import Note from '../note';

export default class FakeNote extends Note {
  constructor(parent) {
    super(parent, {});
    this.$.classList.add('fake');
    this.close();
  }

  mount(element) {
    super.mount(element);
  }

  unmount() {
    const { parentElement } = this.$;
    if (parentElement) {
      parentElement.removeChild(this.$);
    }
  }

  render() {
    return super.render();
  }
}

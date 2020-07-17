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

  render() {
    return super.render();
  }
}

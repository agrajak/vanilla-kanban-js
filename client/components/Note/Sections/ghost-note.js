import Note from '../note';

export default class GhostNote extends Note {
  constructor(parent) {
    super(parent, {});
    this.$.classList.add('ghost');
    this.close();
  }

  mount(element) {
    super.mount(element);
  }

  move(x, y) {
    this.$.setAttribute('style', `left: ${x - 20}; top: ${y - 20};`);
  }

  render() {
    return super.render();
  }
}

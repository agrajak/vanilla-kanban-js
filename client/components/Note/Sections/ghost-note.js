import Note from '../note';

export default class GhostNote extends Note {
  constructor(parent) {
    super(parent, {});
    this.$.classList.add('ghost');
    this.close();
    this.offsetX = 0;
    this.offsetY = 0;
  }

  mount(element) {
    super.mount(element);
  }

  move(x, y) {
    const { offsetX, offsetY } = this;
    this.$.setAttribute('style', `left: ${x - offsetX}; top: ${y - offsetY};`);
  }

  render() {
    return super.render();
  }
}

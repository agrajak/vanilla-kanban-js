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

  render() {
    return super.render();
  }
}

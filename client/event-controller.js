export default class EventController {
  constructor(container) {
    this.$ = container;
    this.ghost = null;
    this.x = null;
    this.y = null;
  }

  moveGhost(x, y) {
    this.ghost.setAttribute('style', `left: ${x}; top: ${y};`);
  }

  onDragStart(event, element) {
    event.stopPropagation();
    const { target, offsetX: x, offsetY: y } = event;
    if (target.classList.contains('col') || target.classList.contains('note')) {
      element.classList.add('selected');
      this.ghost = element.cloneNode(true);
      this.ghost.classList.add('ghost');
      this.onMouseMove = this.onDragStartOver.bind(this);
      this.ghost.addEventListener('mousemove', this.onMouseMove);
      this.x = x;
      this.y = y;
      this.moveGhost(x, y);
      this.$.appendChild(this.ghost);
    }
    return this;
  }

  onDragOver(event) {
    this.ghost.classList.add('dragging');
    const { clientX: x, clientY: y } = event;
    this.moveGhost(x, y);
    return this;
  }

  onDrop(element) {
    this.$.removeEventListener('mousemove', this.onMouseMove);
    element.classList.remove('selected');
    this.$.removeChild(this.ghost);
    this.ghost = null;
    return this;
  }
}

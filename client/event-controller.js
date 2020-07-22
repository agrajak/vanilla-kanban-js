function selectDraggableNode(target) {
  if (target.closest('.note')) {
    return target.closest('.note');
  }
  if (target.classList.contains('col') || target.closest('.col-header')) {
    return target.closest('.col');
  }
  return null;
}

export default class EventController {
  constructor(container) {
    this.$ = container;
    this.ghost = null;
    this.element = null;
    this.$.addEventListener('mousedown', (event) => this.onDragStart(event));
  }

  moveGhost(x, y) {
    const rect = this.$.getBoundingClientRect();
    this.ghost.setAttribute('style', `left: ${x - rect.x}; top: ${y - rect.y};`);
  }

  onDragStart(event) {
    event.stopPropagation();
    const { target } = event;
    const element = selectDraggableNode(target);
    if (element == null) return this;

    element.classList.add('selected');
    this.ghost = element.cloneNode(true);
    this.ghost.classList.add('ghost', 'hidden');
    this.onMouseUp = this.onDrop.bind(this);
    this.onMouseMove = this.onDragOver.bind(this);
    this.$.addEventListener('mousemove', this.onMouseMove);
    this.$.addEventListener('mouseup', this.onMouseUp);
    this.element = element;
    this.$.appendChild(this.ghost);
    return this;
  }

  onDragOver(event) {
    const { clientX: x, clientY: y } = event;
    this.moveGhost(x, y);
    this.ghost.classList.add('dragging');
    this.ghost.classList.remove('hidden');
    return this;
  }

  onDrop() {
    this.$.removeEventListener('mousemove', this.onMouseMove);
    this.$.removeEventListener('mouseup', this.onMouseUp);
    this.element.classList.remove('selected');
    this.$.removeChild(this.ghost);
    this.ghost = null;
    return this;
  }
}

function selectDraggableNode(target) {
  if (target.closest('.note')) {
    return target.closest('.note');
  }
  if (target.classList.contains('col') || target.closest('.col-header')) {
    return target.closest('.col');
  }
  return null;
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

export default class EventController {
  constructor(parent) {
    this.parent = parent;
    this.$ = parent.$;
    this.ghost = null; // 마우스를 따라 다니는 움직이는 element
    this.element = null; // 선택된(드래그 당하는) element
    this.sticker = null; // drop시 예상 배치를 보여주는 element

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
    this.sticker = element.cloneNode(true);
    this.ghost.classList.add('ghost', 'hidden');
    this.sticker.classList.add('sticker');
    this.onMouseUp = this.onDrop.bind(this);
    this.onMouseMove = this.onDragOver.bind(this);
    this.$.addEventListener('mousemove', this.onMouseMove);
    this.$.addEventListener('mouseup', this.onMouseUp);
    this.element = element;
    this.$.appendChild(this.ghost);
    hide(element);
    return this;
  }

  onDragOver(event) {
    const { target, clientX: x, clientY: y } = event;

    this.moveGhost(x, y);
    this.ghost.classList.add('dragging');
    show(this.ghost);

    const $column = target.closest('.col');
    if (!$column) return this;
    show(this.sticker);
    const cid = $column.getAttribute('cid');
    const column = this.parent.columns.find((elem) => elem.props?.id === parseInt(cid, 10));
    if (!column) return this;

    const { notes } = column;
    if (this.sticker.parentElement) {
      this.sticker.parentElement.removeChild(this.sticker);
    }

    const hasNote = notes.reverse().some((note) => {
      const { top, height } = note.$.getBoundingClientRect();
      if (top < y && top + height > y) {
        column.$colBody.insertBefore(this.sticker, note.$);
        return true;
      }
      return false;
    });
    if (!hasNote) {
      column.$colBody.appendChild(this.sticker);
    }

    return this;
  }

  onDrop() {
    this.$.removeEventListener('mousemove', this.onMouseMove);
    this.$.removeEventListener('mouseup', this.onMouseUp);
    show(this.element);
    hide(this.sticker);
    this.element.classList.remove('selected');
    this.$.removeChild(this.ghost);
    this.ghost = null;
    return this;
  }
}

import { moveNote, moveColumn } from '@/api';
import MockElement from './mock-element';

function selectDraggableNode(target) {
  if (target.closest('.note')) {
    return {
      element: target.closest('.note'),
      type: 'note',
    };
  }
  if (target.classList.contains('col') || target.closest('.col-header')) {
    return {
      element: target.closest('.col'),
      type: 'col',
    };
  }
  return {
    element: null,
  };
}

function getCID(element) {
  return parseInt(element.getAttribute('cid'), 10);
}

function getElementIndex(element, type) {
  if (!element.classList.contains(type)) return -1;
  let index = 0;
  const elements = Array.from(element.parentElement.children)
    .filter((node) => {
      const { classList } = node;
      if (classList.contains('ghost') || classList.contains('sticker')) return false;
      if (classList.contains(type)) return true;
      return false;
    });
  elements.some((node) => {
    if (getCID(node) === getCID(element)) {
      return true;
    }
    index += 1;
    return false;
  });
  return index;
}

export default class EventController {
  constructor(parent) {
    this.parent = parent;
    this.$ = parent.$;
    this.ghost = new MockElement(this, 'ghost');
    this.sticker = new MockElement(this, 'sticker');
    this.element = null;
    this.elementType = null;
    this.$.addEventListener('mousedown', (event) => this.onDragStart(event));
  }

  selectNode(element, type) {
    this.element = element;
    this.elementType = type;
    this.element.classList.add('selected');
  }

  unselectNode() {
    this.element.classList.remove('hidden');
    this.element.classList.remove('selected');
    this.element = null;
  }

  hideNode() {
    this.element.classList.add('hidden');
  }

  getNodeColumn() {
    const cid = getCID(this.element.closest('.col'));
    return this.parent.findColumnById(cid);
  }

  onDragStart(event) {
    const { target } = event;
    const { element = null, type } = selectDraggableNode(target);
    if (element == null) return this;
    this.ghost.disguise(element).attach(this.$).hide();
    this.sticker.disguise(element);
    this.selectNode(element, type);

    this.onMouseUp = this.onDrop.bind(this);
    this.onMouseMove = this.onDragOver.bind(this);
    this.$.addEventListener('mousemove', this.onMouseMove);
    this.$.addEventListener('mouseup', this.onMouseUp);
    this.$.addEventListener('mouseleave', this.onMouseUp);

    return this;
  }

  onDragOver(event) {
    this.hideNode();
    const { target, clientX: x, clientY: y } = event;
    this.ghost.move(x, y).show();
    let nodeContainer = null;
    let offset = null;
    if (this.elementType === 'note') {
      nodeContainer = target.closest('.col');
      if (nodeContainer) nodeContainer = nodeContainer.querySelector('.col-body');
      offset = y;
    } else {
      nodeContainer = target.closest('.main-container');
      offset = x;
    }
    if (!nodeContainer) return this;
    this.sticker.show();
    this.moveSticker(nodeContainer, offset);
    return this;
  }

  onDrop() {
    this.$.removeEventListener('mousemove', this.onMouseMove);
    this.$.removeEventListener('mouseup', this.onMouseUp);
    this.$.removeEventListener('mouseleave', this.onMouseUp);

    if (!this.sticker.isChanged) {
      this.unselectNode();
      this.ghost.dettach();
      this.sticker.dettach();
      return this;
    }
    const nodeId = getCID(this.element);
    const position = this.sticker.position();

    if (this.elementType === 'note') {
      const columnId = this.sticker.getSelectedColumnID();
      const oldColumn = this.getNodeColumn();

      moveNote(nodeId, columnId, position)
        .then(() => {
          const oldNote = oldColumn.findNoteById(nodeId);
          oldColumn.removeNote(oldNote, true);
          const newColumn = this.parent.findColumnById(columnId);
          newColumn.insertNote(oldNote, position);
          this.unselectNode();
          this.ghost.dettach();
          this.sticker.dettach();
        });
    } else {
      moveColumn(nodeId, position)
        .then(() => {
          const beforeSticker = this.sticker.$.previousSibling;
          const pastNode = this.element;
          this.unselectNode();
          this.ghost.dettach();
          this.sticker.dettach();
          // swap two columns;
          pastNode.parentElement.insertBefore(pastNode, beforeSticker.nextSibling);
        });
    }

    return this;
  }

  moveSticker(element, position) {
    const $nodes = Array.from(element.children)
      .filter((node) => node.classList.contains(this.elementType))
      .filter((node) => !node.classList.contains('hidden'));
    if ($nodes.length === 0) {
      this.sticker.attach(element);
      this.sticker.isChanged = true;
      return this;
    }
    // 각 노트를 아래서부터 해당 노트에 스티커가 붙을 수 있나 확인
    const hasProperNode = $nodes.slice().reverse().some(($node) => {
      const {
        top, height, left, width,
      } = $node.getBoundingClientRect();
      let offset = 0;
      let size = 0;
      if (this.elementType === 'note') {
        offset = top;
        size = height;
      } else {
        offset = left;
        size = width;
      }
      if (offset < position && offset + size / 2 > position) {
        this.sticker.attachBefore($node);
        this.sticker.isChanged = true;
        return true;
      }
      if (offset + size / 2 < position) {
        if ($node.nextSibling) {
          this.sticker.attachBefore($node.nextSibling);
          this.sticker.isChanged = true;
        } else {
          this.sticker.attach(element);
          this.sticker.isChanged = true;
        }
        return true;
      }
      return false;
    });
    // 커서가 노트들 위에 있으면 첫노트 이전에 스티커를 삽입한다.
    if (!hasProperNode) {
      const $firstNode = $nodes[0];
      const { y: noteY, x: noteX } = $firstNode.getBoundingClientRect();
      let offset = 0;
      if (this.elementType === 'note') {
        offset = noteY;
      } else {
        offset = noteX;
      }
      if (offset > position) {
        this.sticker.attachBefore($firstNode);
        this.sticker.isChanged = true;
        return this;
      }
    }
    return this;
  }
}

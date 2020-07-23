import { moveNote } from '@/api';
import MockElement from './mock-element';

function selectDraggableNode(target) {
  if (target.closest('.note')) {
    return target.closest('.note');
  }
  // if (target.classList.contains('col') || target.closest('.col-header')) {
  //   return target.closest('.col');
  // }
  return null;
}

function getCID(element) {
  return parseInt(element.getAttribute('cid'), 10);
}

export default class EventController {
  constructor(parent) {
    this.parent = parent;
    this.$ = parent.$;
    this.ghost = new MockElement(this, 'ghost');
    this.sticker = new MockElement(this, 'sticker');
    this.element = null;
    this.$.addEventListener('mousedown', (event) => this.onDragStart(event));
  }

  selectNode(element) {
    this.element = element;
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
    const element = selectDraggableNode(target);
    if (element == null) return this;
    this.ghost.disguise(element).attach(this.$).hide();
    this.sticker.disguise(element);
    this.selectNode(element);

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
    const $column = target.closest('.col');
    if (!$column) return this;

    this.sticker.show();
    const $colBody = $column.querySelector('.col-body');
    this.moveSticker($colBody, y);
    return this;
  }

  onDrop() {
    this.$.removeEventListener('mousemove', this.onMouseMove);
    this.$.removeEventListener('mouseup', this.onMouseUp);
    this.$.removeEventListener('mouseleave', this.onMouseUp);

    const noteId = getCID(this.element);
    const oldColumn = this.getNodeColumn();
    if (!this.sticker.isChanged) {
      this.unselectNode();
      this.ghost.dettach();
      this.sticker.dettach();
      return this;
    }

    const columnId = this.sticker.getSelectedColumnID();
    const position = this.sticker.position();

    moveNote(noteId, columnId, position)
      .then(() => {
        const oldNote = oldColumn.findNoteById(noteId);
        oldColumn.removeNote(oldNote, true);
        const newColumn = this.parent.findColumnById(columnId);
        newColumn.insertNote(oldNote, position);
        this.unselectNode();
        this.ghost.dettach();
        this.sticker.dettach();
      });

    return this;
  }

  moveSticker(element, position) {
    const $notes = Array.from(element.children)
      .filter((node) => node.classList.contains('note'))
      .filter((node) => !node.classList.contains('hidden'));
    if ($notes.length === 0) {
      this.sticker.attach(element);
      this.sticker.isChanged = true;
      return this;
    }
    // 각 노트를 아래서부터 해당 노트에 스티커가 붙을 수 있나 확인
    const hasProperNote = $notes.slice().reverse().some(($note) => {
      const { top, height } = $note.getBoundingClientRect();
      if (top < position && top + height / 2 > position) {
        this.sticker.attachBefore($note);
        this.sticker.isChanged = true;
        return true;
      }
      if (top + height / 2 < position) {
        if ($note.nextSibling) {
          this.sticker.attachBefore($note.nextSibling);
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
    if (!hasProperNote) {
      const $firstNote = $notes[0];
      const { y: noteY } = $firstNote.getBoundingClientRect();
      if (noteY > position) {
        this.sticker.attachBefore($firstNote);
        this.sticker.isChanged = true;
        return this;
      }
    }
    return this;
  }
}

import MockElement from "./mock-element";

function selectDraggableNode(target) {
  if (target.closest(".note")) {
    return {
      element: target.closest(".note"),
      type: "note",
    };
  }
  if (target.classList.contains("col") || target.closest(".col-header")) {
    return {
      element: target.closest(".col"),
      type: "col",
    };
  }
  return {
    element: null,
  };
}

function getCID(element) {
  return parseInt(element.getAttribute("cid"), 10);
}

export default class EventController {
  constructor(parent) {
    this.parent = parent;
    this.$ = parent.$;
    this.ghost = new MockElement(this, "ghost");
    this.sticker = new MockElement(this, "sticker");
    this.element = null;
    this.elementType = null;
    this.$.addEventListener("mousedown", (event) => this.onDragStart(event));
  }

  selectNode(element, type) {
    this.element = element;
    this.elementType = type;
    this.element.classList.add("selected");
  }

  unselectNode() {
    this.element.classList.remove("hidden");
    this.element.classList.remove("selected");
    this.element = null;
  }

  hideNode() {
    this.element.classList.add("hidden");
  }

  onDragStart(event) {
    if (this.element) return this;
    const { target, clientX, clientY, pageX } = event;
    const { element = null, type } = selectDraggableNode(target); // 노트가 컬럼이 반환된다.
    if (element == null) return this;
    const { x, y } = element.getBoundingClientRect();
    this.selectNode(element, type);
    this.ghost
      .disguise(element)
      .attach(this.$)
      .setOffset(clientX - x + clientX - pageX, clientY - y)
      .hide();
    this.sticker.disguise(element);

    this.onMouseUp = this.onDrop.bind(this);
    this.onMouseMove = this.onDragOver.bind(this);
    this.$.addEventListener("mousemove", this.onMouseMove);
    this.$.addEventListener("mouseup", this.onMouseUp);
    this.$.addEventListener("mouseleave", this.onMouseUp);

    return this;
  }

  onDragOver(event) {
    this.hideNode();
    const { target, clientX: x, clientY: y } = event;
    this.ghost.move(x, y).show();
    const { nodeContainer, offset } = this.getNodeContainerByType(target, x, y);
    if (!nodeContainer) return this;
    if (!this.sticker.hasAttached()) {
      this.sticker.attachBefore(this.element);
    }
    this.sticker.show();
    this.moveSticker(nodeContainer, offset);
    return this;
  }

  onDrop() {
    this.$.removeEventListener("mousemove", this.onMouseMove);
    this.$.removeEventListener("mouseup", this.onMouseUp);
    this.$.removeEventListener("mouseleave", this.onMouseUp);
    if (!this.sticker.hasAttached()) {
      this.unselectNode();
      this.ghost.dettach();
      this.sticker.dettach();
      return this;
    }

    this.moveNode();
    return this;
  }

  moveNode() {
    const nodeId = getCID(this.element);
    const position = this.sticker.position();

    if (this.elementType === "note") {
      const columnId = this.sticker.getSelectedColumnID();
      const oldColumn = this.getNodeColumn();

      const oldNote = oldColumn.findNoteById(nodeId);
      oldColumn.removeNote(oldNote, true);
      const newColumn = this.parent.findColumnById(columnId);
      newColumn.insertNote(oldNote, position);
      this.unselectNode();
      this.ghost.dettach();
      this.sticker.dettach();
      return;
    }
    const beforeSticker = this.sticker.$.previousSibling;
    const pastNode = this.element;
    this.unselectNode();
    this.ghost.dettach();
    this.sticker.dettach();
    // swap two columns;
    pastNode.parentElement.insertBefore(pastNode, beforeSticker.nextSibling);
  }

  getNodeContainerByType(target, x, y) {
    let nodeContainer = 0;
    let offset = 0;
    if (this.elementType === "note") {
      nodeContainer = target.closest(".col");
      if (nodeContainer)
        nodeContainer = nodeContainer.querySelector(".col-body");
      offset = y;
    } else {
      nodeContainer = target.closest(".main-container");
      offset = x;
    }
    return {
      nodeContainer,
      offset,
    };
  }

  getOffsetFromRectByType(element) {
    const { left, top, height, width } = element.getBoundingClientRect();
    if (this.elementType === "note") {
      return {
        offset: top,
        size: height,
      };
    }
    return {
      offset: left,
      size: width,
    };
  }

  isSwappable(node) {
    const { classList } = node;
    if (classList.contains("hidden") || classList.contains("ghost"))
      return false;
    if (classList.contains(this.elementType)) return true;
    return false;
  }

  moveSticker(element, position) {
    const $nodes = Array.from(element.children).filter(
      this.isSwappable.bind(this)
    );
    if ($nodes.length === 0) {
      this.sticker.attach(element);
      this.sticker.isChanged = true;
      return this;
    }
    // 각 노트를 아래서부터 해당 노트에 스티커가 붙을 수 있나 확인
    const hasProperNode = $nodes
      .slice()
      .reverse()
      .some(($node) => {
        if ($node.classList.contains("sticker")) return false;
        const { offset, size } = this.getOffsetFromRectByType($node);
        if (offset < position && offset + size / 2 > position) {
          this.sticker.attachBefore($node);
          return true;
        }
        if (offset + size / 2 < position) {
          if ($node.nextSibling) {
            this.sticker.attachBefore($node.nextSibling);
          } else {
            this.sticker.attach(element);
          }
          return true;
        }
        return false;
      });
    // 커서가 노트들 위에 있으면 첫노트 이전에 스티커를 삽입한다.
    if (!hasProperNode) {
      const $firstNode = $nodes[0];
      const { offset } = this.getOffsetFromRectByType($firstNode);
      if (offset > position) {
        this.sticker.attachBefore($firstNode);
        return this;
      }
    }
    return this;
  }

  getNodeColumn() {
    const cid = getCID(this.element.closest(".col"));
    return this.parent.findColumnById(cid);
  }
}

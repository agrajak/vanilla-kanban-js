class Notes {
  constructor({
    id, text, position, writer, columnId,
  }) {
    this.id = id;
    this.text = text;
    this.position = position;
    this.writer = writer;
    this.columnId = columnId;
  }
}

module.exports = Notes;

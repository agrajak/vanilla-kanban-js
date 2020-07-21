class Notes {
  constructor({
    id, text, position, writerId, writer_id, ownerId, owner_id, columnId, column_id,
  }) {
    this.id = id;
    this.text = text;
    this.position = position;
    this.writerId = writerId || writer_id;
    this.ownerId = ownerId || owner_id;
    this.columnId = columnId || column_id;
  }
}

module.exports = Notes;

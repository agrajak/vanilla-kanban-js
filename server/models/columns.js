/* eslint-disable camelcase */
class Columns {
  constructor({
    id, title, ownerId, writerId, writer_id, owner_id, position,
  }) {
    this.id = id;
    this.title = title;
    this.ownerId = ownerId || owner_id;
    this.writerId = writerId || writer_id;
    this.position = position;
  }
}

module.exports = Columns;

/* eslint-disable camelcase */
class Columns {
  constructor({
    id, title, ownerId, writerId, writer_id, owner_id,
  }) {
    this.id = id;
    this.title = title;
    this.ownerId = ownerId || owner_id;
    this.writer = writerId || writer_id;
  }
}

module.exports = Columns;

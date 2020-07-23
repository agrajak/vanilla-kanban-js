class Logs {
  constructor({
    id, ownerId, owner_id, writerId, writer_id, type, action, target, source,
  }) {
    this.id = id;
    this.ownerId = ownerId || owner_id;
    this.writerId = writerId || writer_id;
    this.type = type;
    this.action = action;
    this.target = target;
    this.source = source;
  }
}

module.exports = Logs;

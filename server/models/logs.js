class Logs {
  constructor({
    id, ownerId, owner_id, writerId, writer_id, type, action, target, source, createdAt, created_at,
  }) {
    this.id = id;
    this.ownerId = ownerId || owner_id;
    this.writerId = writerId || writer_id;
    this.type = type;
    this.action = action;
    this.target = target;
    this.source = source;
    this.createdAt = createdAt || created_at;
  }
}

module.exports = Logs;

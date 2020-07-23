const Log = require('../models/logs');
const LogService = require('../services/logs');
const { success, fail } = require('./helper');

exports.createLog = async (req, res) => {
  const {
    ownerId, writerId, type, action, target, source,
  } = req.body;

  try {
    const log = await LogService.createLog(new Log({
      ownerId, writerId, type, action, target, source,
    }));
    return res.send(success({
      log,
    }));
  } catch ({ message }) {
    return res.status(500).json(fail(message));
  }
};

exports.findLogsByUserId = async (req, res) => {
  const { id } = req.query;

  try {
    const logs = await LogService.findLogsByUserId(id);
    return res.json(success({
      logs: logs.map((x) => ({
        id: x.id,
        ownerId: x.ownerId,
        writerId: x.writerId,
        type: x.type,
        action: x.action,
        target: x.target,
        source: x.source,
      })),
    }));
  } catch ({ message }) {
    return res.status(500).json(fail(message));
  }
};

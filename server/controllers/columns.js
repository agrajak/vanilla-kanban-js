const Column = require('../models/columns');
const Log = require('../models/logs');
const ColumnService = require('../services/columns');
const LogService = require('../services/logs');
const { success, fail } = require('./helper');
const pool = require('../pool');

exports.createColumn = async (req, res) => {
  const { title, ownerId, writerId } = req.body;
  try {
    const conn = await pool.getConnection();
    const position = await ColumnService.getLastPosition(ownerId, conn);
    const column = await ColumnService.createColumn(new Column({
      title, ownerId, writerId, position: position + 1,
    }), conn);
    await conn.release();

    await LogService.createLog(new Log({
      ownerId, writerId, type: 'Column', action: 'create',
    }));

    return res.send(success({
      column,
    }));
  } catch ({ message }) {
    return res.status(500).json(fail(message));
  }
};

exports.findColumn = async (req, res) => {
  const { id } = req.query;
  try {
    const notes = await ColumnService.findColumnInfo(id);
    return res.send(success({
      notes,
    }));
  } catch ({ message }) {
    return res.status(500).json(fail(message));
  }
};

exports.updateColumnTitle = async (req, res) => {
  const { id, title } = req.body;
  try {
    const { ownerId, title: oldTitle } = await ColumnService.findColumnById(id);
    await ColumnService.updateColumnTitle(new Column({
      id, title,
    }));
    await LogService.createLog(new Log({
      ownerId, writerId: 'agrajak', type: 'Column', action: 'edit', source: oldTitle, target: title,
    }));
    return res.send(success());
  } catch ({ message }) {
    return res.status(500).json(fail(message));
  }
};

exports.updateColumnPosition = async (req, res) => {
  const { id, position } = req.body;
  try {
    await ColumnService.moveColumn(new Column({
      id, position,
    }));
    return res.send(success());
  } catch ({ message }) {
    return res.status(500).json(fail(message));
  }
};

exports.deleteColumn = async (req, res) => {
  const { id } = req.query;
  try {
    const { ownerId, title } = await ColumnService.findColumnById(id);
    await ColumnService.deleteColumnById(id);
    await LogService.createLog(new Log({
      ownerId, writerId: 'agrajak', type: 'Column', action: 'delete', source: title,
    }));
    return res.send(success());
  } catch ({ message }) {
    return res.status(500).json(fail(message));
  }
};

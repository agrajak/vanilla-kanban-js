const Column = require('../models/columns');
const ColumnService = require('../services/columns');
const { success, fail } = require('./helper');

exports.createColumn = async (req, res) => {
  const { ownerId } = req.body;
  const writerId = 'agrajak';
  try {
    const position = await ColumnService.getTopPosition(ownerId);
    const column = await ColumnService.createColumn(new Column({
      title: 'test', ownerId, writerId, position,
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
    await ColumnService.updateColumnTitle(new Column({
      id, title,
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
    await ColumnService.deleteColumnById(id);
    return res.send(success());
  } catch ({ message }) {
    return res.status(500).json(fail(message));
  }
};

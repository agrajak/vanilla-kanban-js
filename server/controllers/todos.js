const ColumnService = require('../services/columns');
const { success, fail } = require('./helper');

exports.findColumnsByUserId = async (req, res) => {
  const { id } = req.query;
  try {
    const columns = await ColumnService.findColumnsByUserId(id);
    return res.json(success({
      columns: columns.map((x) => x.id),
    }));
  } catch ({ message }) {
    return res.status(500).json(fail(message));
  }
};

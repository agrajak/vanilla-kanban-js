const UserService = require('../services/users');

exports.findUser = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await UserService.findUser(id);
    return res.send({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

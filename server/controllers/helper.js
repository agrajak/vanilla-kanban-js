exports.fail = (message) => ({
  success: false,
  message,
});

exports.success = (payload) => ({
  success: true,
  payload,
});

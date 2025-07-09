function success(res, message, data) {
  return res.status(200).json(data);
}

function error(res, message = "Something went wrong", statusCode = 500) {
  return res.status(statusCode).json({
    status: "error",
    message,
  });
}

function warning(res, message, data = {}) {
  return res.status(200).json({
    status: "warning",
    message,
    data,
  });
}

module.exports = { success, error, warning };

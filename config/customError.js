import httpStatus from 'http-status-codes';

const customError = (
  statusCode = httpStatus.INTERNAL_SERVER_ERROR,
  message = httpStatus.getStatusText(statusCode),
  data = { message, statusCode },
) => {
  return {
    message,
    statusCode,
    data,
  };
};

export default customError;

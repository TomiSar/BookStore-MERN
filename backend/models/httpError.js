class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); //Message
    this.code = errorCode; //ErrorCode
  }
}

module.exports = HttpError;

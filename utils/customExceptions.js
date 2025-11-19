export class CustomException extends Error {
  constructor(message) {
    super(message);
  }
}

export class UnauthorizedException extends CustomException {
  statusCode;
  constructor(errorMessage = "You are not authorized") {
    super(errorMessage);
    this.statusCode = 401;
  }
}

export class NotFoundException extends CustomException {
  statusCode;
  constructor(errorMessage = "Not found") {
    super(errorMessage);
    this.statusCode = 404;
  }
}

class BadRequestException extends CustomException {
  statusCode;
  constructor(message = "invalid") {
    super(message);
    this.statusCode = 400;
  }
}

export class FormValidatorException extends BadRequestException {
  errors;
  constructor(errors = "", message = "invalid form data") {
    super(message);
    this.errors = errors;
  }
}

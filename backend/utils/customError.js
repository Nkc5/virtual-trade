class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.name = this.constructor.name;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // Specific error classes
  class NotFoundError extends CustomError {
    constructor(message = "Resource not found") {
      super(message, 404);
    }
  }
  
  class BadRequestError extends CustomError {
    constructor(message = "Bad request") {
      super(message, 400);
    }
  }
  
  class UnauthorizedError extends CustomError {
    constructor(message = "Unauthorized access") {
      super(message, 401);
    }
  }
  
  class ForbiddenError extends CustomError {
    constructor(message = "Forbidden") {
      super(message, 403);
    }
  }
  
  class InternalServerError extends CustomError {
    constructor(message = "Internal server error") {
      super(message, 500);
    }
  }
  
  // Middleware to handle errors
  const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      error: true,
      message: err.message || "Something went wrong",
    });
  };
  
  module.exports = {
    CustomError,
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    InternalServerError,
    errorHandler,
  };
  
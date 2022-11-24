module.exports = class ConstraintViolationError extends Error {
    constructor(message) {
      super(message);
    }
}
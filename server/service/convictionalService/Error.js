class CustomError extends Error {
  constructor({ message, code }) {
    super(message)
    this.code = code
  }
}

export class NotFoundError extends CustomError {
  constructor(message) {
    super({ message, code: 404 })
  }
}

export class InvalidRequest extends CustomError {
  constructor(message) {
    super({ message, code: 400 })
  }
}

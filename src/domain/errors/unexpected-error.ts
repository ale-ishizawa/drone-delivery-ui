export class UnexpectedError extends Error {
  constructor() {
    super('Oops! Algo deu errado.')
    this.name = 'UnexpectedError'
  }
}
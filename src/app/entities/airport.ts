export interface IAirport {
  code: string;

  description: string;
}

export default class Airport implements IAirport {
  code: string;

  description: string;

  constructor({ code, description }: IAirport) {
    this.code = code;
    this.description = description;
    if (typeof this.code !== 'string' || this.code.length !== 3) {
      throw new Error(`The airport code: ${this.code} is not valid`);
    }
    if (typeof this.description !== 'string' || this.description.length === 0) {
      throw new Error(`The airport description: ${this.description} is not valid`);
    }
  }
}

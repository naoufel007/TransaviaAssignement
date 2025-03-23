import dayjs from 'dayjs';

export interface IFlight {
  departureDateTime: string;

  arrivalDateTime: string;

  flightNumber: number;

  departureAirport: string;

  arrivalAirport: string;

  price: number;
}

export default class Flight implements IFlight {
  departureDateTime: string;

  arrivalDateTime: string;

  flightNumber: number;

  departureAirport: string;

  arrivalAirport: string;

  price: number;

  constructor({
    departureDateTime, arrivalDateTime, flightNumber, departureAirport, arrivalAirport, price
  }: IFlight) {
    this.departureDateTime = departureDateTime;
    this.arrivalDateTime = arrivalDateTime;
    this.flightNumber = flightNumber;
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.price = price;
    if (typeof this.flightNumber !== 'number' || flightNumber < 0) {
      throw new Error(`The flight number: ${this.flightNumber} is not valid`);
    }

    if (typeof this.departureDateTime !== 'string') {
      throw new Error(`The flight number: ${this.flightNumber} has an invalid departure date`);
    }
    const departureDate = dayjs(this.departureDateTime, 'YYYY-MM-DD HH:mm');
    if (!departureDate.isValid()) {
      throw new Error(`The flight number: ${this.flightNumber} has a departure date with bad format`);
    }

    if (typeof this.arrivalDateTime !== 'string') {
      throw new Error(`The flight number: ${this.flightNumber} has an invalid arrival date`);
    }
    const arrivalDate = dayjs(this.arrivalDateTime, 'YYYY-MM-DD HH:mm');
    if (!arrivalDate.isValid()) {
      throw new Error(`The flight number: ${this.flightNumber} has an arrival date with bad format`);
    }

    if (departureDate.isAfter(arrivalDate)) {
      throw new Error(`The flight number: ${this.flightNumber} has departure date greater than the arrival date`);
    }

    if (typeof this.departureAirport !== 'string' || departureAirport.length !== 3) {
      throw new Error(`The flight number: ${this.flightNumber} has an invalid departure airport`);
    }

    if (typeof this.arrivalAirport !== 'string' || arrivalAirport.length !== 3) {
      throw new Error(`The flight number: ${this.flightNumber} has an invalid arrival airport`);
    }

    if (this.departureAirport === this.arrivalAirport) {
      throw new Error(`The flight number: ${this.flightNumber} has same departure/arrival airport`);
    }

    if (typeof this.price !== 'number' || this.price < 0) {
      throw new Error(`The flight number: ${this.flightNumber} has an invalid price`);
    }
  }
}

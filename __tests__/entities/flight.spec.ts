import Flight from "@/app/entities/flight";

const entity = {
    departureDateTime: '2025-01-01T07:20',
    arrivalDateTime: '2025-01-01T09:20',
    flightNumber: 123,
    departureAirport: 'AMS',
    arrivalAirport: 'CDG',
    price: 152.33
}
describe("flight", () => {
    test("return flight", () => {
        const expected = {
            departureDateTime: '2025-01-01T07:20',
            arrivalDateTime: '2025-01-01T09:20',
            flightNumber: 123,
            departureAirport: 'AMS',
            arrivalAirport: 'CDG',
            price: 152.33
        };
        const result = new Flight(entity);
        expect(result.departureDateTime).toEqual(expected.departureDateTime);
        expect(result.arrivalDateTime).toEqual(expected.arrivalDateTime);
        expect(result.flightNumber).toEqual(expected.flightNumber);
        expect(result.departureAirport).toEqual(expected.departureAirport);
        expect(result.arrivalAirport).toEqual(expected.arrivalAirport);
        expect(result.price).toEqual(expected.price);
    });
    test("invalid flight number", () => {
        const invalid = {...entity, flightNumber: 'xxxx'};
        expect(() => new Flight(invalid as any)).toThrow('The flight number: xxxx is not valid');
    });
    test("invalid departureDateTime", () => {
        const invalid = {...entity, departureDateTime: 'abc'};
        expect(() => new Flight(invalid as any)).toThrow('The flight number: 123 has a departure date with bad format');
    });
    test("invalid arrivalDateTime", () => {
        const invalid = {...entity, arrivalDateTime: 'def'};
        expect(() => new Flight(invalid as any)).toThrow('The flight number: 123 has an arrival date with bad format');
    });
    test("departure datetime greater than arrival datetime", () => {
        const invalid = {...entity, arrivalDateTime: '2024-12-30'};
        expect(() => new Flight(invalid as any)).toThrow('The flight number: 123 has departure date greater than the arrival date');
    });
    test("invalid departureAirport", () => {
        const invalid = {...entity, departureAirport: 123};
        expect(() => new Flight(invalid as any)).toThrow('The flight number: 123 has an invalid departure airport');
    });
    test("invalid arrivalAirport", () => {
        const invalid = {...entity, arrivalAirport: 'xxxx'};
        expect(() => new Flight(invalid as any)).toThrow('The flight number: 123 has an invalid arrival airport');
    });
    test("same departure/arrival airport", () => {
        const invalid = {...entity, arrivalAirport: 'ABC', departureAirport: 'ABC'};
        expect(() => new Flight(invalid as any)).toThrow('The flight number: 123 has same departure/arrival airport');
    });
    test("invalid price", () => {
        const invalid = {...entity, price: '2025'};
        expect(() => new Flight(invalid as any)).toThrow('The flight number: 123 has an invalid price');
    });
});
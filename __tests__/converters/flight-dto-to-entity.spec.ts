import flightDtoToEntity from "@/app/converters/flight-dto-to-entity";

describe("flightDtoToEntity", () => {
    test("convert to entity", () => {
        const dto = {
            outboundFlight: {
                departureDateTime: '2025-01-01T07:20',
                arrivalDateTime: '2025-01-01T09:20',
                flightNumber: 123,
                departureAirport: {
                    locationCode: 'AMS'
                },
                arrivalAirport: {
                    locationCode: 'CDG'
                }
            },
            pricingInfoSum: {
                totalPriceAllPassengers: 152.33
            }
        };
        const expected = {
            departureDateTime: '2025-01-01T07:20',
            arrivalDateTime: '2025-01-01T09:20',
            flightNumber: 123,
            departureAirport: 'AMS',
            arrivalAirport: 'CDG',
            price: 152.33
        };
        const result = flightDtoToEntity(dto);
        expect(result).toEqual(expected);
    });
});
import FlightsTable from '@/app/components/flights-table';
import Flight from '@/app/entities/flight';
import { render } from '@testing-library/react';
import dayjs from 'dayjs';
import '../mocks/match-media.mock';

describe('FlightsTable component', () => {
    it('render no flights', () => {
        const flights: Flight[] = [];
        const {
            getByText
          } = render(
            <FlightsTable
                flights={flights}
            />
        );
        expect(getByText("No flights for this request.")).toBeInTheDocument();
    });

    it('render flights table', () => {
        const flights: Flight[] = [
            { departureDateTime: "2025-03-21T07:30", arrivalDateTime: "2025-03-21T09:30", price: 10.56, flightNumber: 14, departureAirport: "AMS", arrivalAirport: "EIN" },
            { departureDateTime: "2025-03-21T20:05", arrivalDateTime: "2025-03-21T22:15", price: 200, flightNumber: 13, departureAirport: "AMS", arrivalAirport: "CDG" }
        ];
        const {
            getByText
          } = render(
            <FlightsTable
                flights={flights}
            />
        );

        expect(getByText("Departure Time")).toBeInTheDocument();
        expect(getByText("Arrival Time")).toBeInTheDocument();
        expect(getByText("Price (EUR)")).toBeInTheDocument();

        expect(getByText(dayjs(flights[0].departureDateTime).format("HH:mm"))).toBeInTheDocument();
        expect(getByText(dayjs(flights[0].arrivalDateTime).format("HH:mm"))).toBeInTheDocument();
        expect(getByText(flights[0].price)).toBeInTheDocument();

        expect(getByText(dayjs(flights[1].departureDateTime).format("HH:mm"))).toBeInTheDocument();
        expect(getByText(dayjs(flights[1].arrivalDateTime).format("HH:mm"))).toBeInTheDocument();
        expect(getByText(flights[1].price)).toBeInTheDocument();
    });
});
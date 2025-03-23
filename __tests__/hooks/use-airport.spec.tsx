import {
    QueryClient, QueryClientProvider
} from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import flightRepository from '../../src/app/repositories/flight';
import airportRepository from '../../src/app/repositories/airport';
import { useDepartureAirportsFetchAll, useArrivalAirportsFetchAllByOrigin } from '@/app/hooks/use-airport';
import Flight from '@/app/entities/flight';
import Airport from '@/app/entities/airport';
import mockArrivalAirports from '../mocks/arrival-airport.mock';
import mockFlights from '../mocks/flight.mock';

jest.mock("../../src/app/repositories/airport");
jest.mock("../../src/app/repositories/flight");
const getFlightsMock = flightRepository.getFlights as jest.MockedFunction<typeof flightRepository.getFlights>;
const getAirportDataByIsoCodeMock = airportRepository.getAirportDataByIsoCode as jest.MockedFunction<typeof airportRepository.getAirportDataByIsoCode>;

const flights: Flight[] = mockFlights.returnResult.flights;
const departudeAirports: Airport[] = [
    { code: 'AMS', description: 'Amsterdam, NL'}
];
const arrivalAirport: Airport = {
    code: 'CDG',
    description: 'Paris, FR'
};
let queryClient = new QueryClient();

describe("useDepartureAirportsFetchAll", () => {
    beforeEach(() => {
        getFlightsMock.mockReset();
        getAirportDataByIsoCodeMock.mockReset();
        queryClient = new QueryClient();
    });
    it("load departure airports", async() => {
        const wrapper = ({ children }: any) => (
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
        );
        getFlightsMock.mockImplementationOnce(() => flights);
        getAirportDataByIsoCodeMock.mockImplementationOnce((code) => departudeAirports[0]);
        const { result } = renderHook(() => useDepartureAirportsFetchAll(), { wrapper });

        expect(result.current.loading).toBe(true);

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(flightRepository.getFlights).toHaveBeenCalledWith();
        expect(result.current.airports).toEqual(departudeAirports);
    });
    it("failed to load deoarture airports because of unknown code", async() => {
        const wrapper = ({ children }: any) => (
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
        );
        getFlightsMock.mockImplementationOnce(() => flights);
        getAirportDataByIsoCodeMock.mockImplementationOnce((code) => new Airport({code: 'xxx', description: 'invalid'}));
        const { result } = renderHook(() => useDepartureAirportsFetchAll(), { wrapper });

        await waitFor(() => expect(result.current.loading).toBe(true));

        expect(flightRepository.getFlights).toHaveBeenCalledWith();
        expect(result.current.airports).toEqual([]);
    });
});

describe("useArrivalAirportsFetchAllByOrigin", () => {
    beforeEach(() => {
        getFlightsMock.mockReset();
        getAirportDataByIsoCodeMock.mockReset();
        queryClient = new QueryClient();
    });
    it("load arrival airports", async() => {
        const wrapper = ({ children }: any) => (
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
        );
        getFlightsMock.mockImplementationOnce(() => flights);
        getAirportDataByIsoCodeMock.mockImplementationOnce((code) => arrivalAirport);
        const { result } = renderHook(() => useArrivalAirportsFetchAllByOrigin('AMS'), { wrapper });

        expect(result.current.loading).toBe(true);

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(flightRepository.getFlights).toHaveBeenCalledWith();
        expect(result.current.airports).toEqual([arrivalAirport]);
    });
    it("failed to load arrival airports because of unknown code", async() => {
        const wrapper = ({ children }: any) => (
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
        );
        getFlightsMock.mockImplementationOnce(() => flights);
        getAirportDataByIsoCodeMock.mockImplementationOnce((code) => new Airport({code: 'xxx', description: 'invalid'}));
        const { result } = renderHook(() => useArrivalAirportsFetchAllByOrigin('xxx'), { wrapper });

        await waitFor(() => expect(result.current.loading).toBe(true));

        expect(flightRepository.getFlights).toHaveBeenCalledWith();
        expect(result.current.airports).toEqual([]);
    });
});
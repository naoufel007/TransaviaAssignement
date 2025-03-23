import {
    QueryClient, QueryClientProvider
} from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import flightRepository from '../../src/app/repositories/flight';
import mockFlights from '../mocks/flight.mock';
import { useFlightFetchAll, useFlightFetchByRequest } from '@/app/hooks/use-flight';
import Flight from '@/app/entities/flight';
import dayjs from 'dayjs';

jest.mock("../../src/app/repositories/flight");
const getFlightsMock = flightRepository.getFlights as jest.MockedFunction<typeof flightRepository.getFlights>;
const flights: Flight[] = mockFlights.returnResult.flights;
const request = {
    origin: 'AMS',
    destination: 'CDG',
    date: dayjs('2025-03-21')
};
let queryClient = new QueryClient();

describe("useFlightFetchAll", () => {
    beforeEach(() => {
        getFlightsMock.mockReset();
        queryClient = new QueryClient();
    });
    it("load flights", async() => {
        const wrapper = ({ children }: any) => (
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
        );
        getFlightsMock.mockImplementationOnce(() => flights);
        const { result } = renderHook(() => useFlightFetchAll(), { wrapper });

        expect(result.current.loadingFlight).toBe(true);

        await waitFor(() => expect(result.current.loadingFlight).toBe(false));

        expect(flightRepository.getFlights).toHaveBeenCalledWith();
        expect(result.current.flights).toEqual(flights);
    });
    it("failed to load flights", async() => {
        const wrapper = ({ children }: any) => (
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
        );
        getFlightsMock.mockImplementationOnce(() => { throw new Error('Failed to load flights')});
        const { result } = renderHook(() => useFlightFetchAll(), { wrapper });

        await waitFor(() => expect(result.current.loadingFlight).toBe(true));

        expect(flightRepository.getFlights).toHaveBeenCalledWith();
        expect(result.current.flights).toEqual([]);
    });
});

describe("useFlightFetchByRequest", () => {
    beforeEach(() => {
        getFlightsMock.mockReset();
        queryClient = new QueryClient();
    });
    it("load flights by request", async() => {
        const wrapper = ({ children }: any) => (
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
        );
        getFlightsMock.mockImplementationOnce(() => flights);
        const { result } = renderHook(() => useFlightFetchByRequest(request), { wrapper });

        expect(result.current.loadingFlight).toBe(true);

        await waitFor(() => expect(result.current.loadingFlight).toBe(false));

        expect(flightRepository.getFlights).toHaveBeenCalledWith();
        expect(result.current.flights).toEqual(flights);
    });
    it("no flights for that date", async() => {
        const wrapper = ({ children }: any) => (
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
        );
        getFlightsMock.mockImplementationOnce(() => flights);
        const { result } = renderHook(() => useFlightFetchByRequest({...request, date: dayjs('2025-04-04')}), { wrapper });

        expect(result.current.loadingFlight).toBe(true);

        await waitFor(() => expect(result.current.loadingFlight).toBe(false));

        expect(flightRepository.getFlights).toHaveBeenCalledWith();
        expect(result.current.flights).toEqual([]);
    });
    it("failed to load flights", async() => {
        const wrapper = ({ children }: any) => (
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
        );
        getFlightsMock.mockImplementationOnce(() => { throw new Error('Failed to load flights')});
        const { result } = renderHook(() => useFlightFetchByRequest(request), { wrapper });

        await waitFor(() => expect(result.current.loadingFlight).toBe(true));

        expect(flightRepository.getFlights).toHaveBeenCalledWith();
        expect(result.current.flights).toEqual([]);
    });
});
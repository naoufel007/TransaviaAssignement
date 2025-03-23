import dayjs, { Dayjs } from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import Flight from '../entities/flight';
import flightRepository from '../repositories/flight';

interface FlightParams {
  origin: string;
  destination: string;
  date: Dayjs | undefined;
}

interface UseFetchReturn {
  flights: Flight[],
  loadingFlight: boolean,
  errorFlight: any
}

export function useFlightFetchAll(): UseFetchReturn {
  const { data, isLoading, error } = useQuery({
    queryKey: ['flights'],
    queryFn: () => flightRepository.getFlights()
  });

  return {
    flights: data ?? [],
    loadingFlight: isLoading,
    errorFlight: error
  };
}

export function useFlightFetchByRequest({ origin, destination, date }: FlightParams): UseFetchReturn {
  const { flights, loadingFlight, errorFlight } = useFlightFetchAll();

  let filteredflights = (flights ?? []).filter((flight) => flight.departureAirport.toUpperCase() === origin.toUpperCase()
                                             && flight.arrivalAirport.toUpperCase() === destination.toUpperCase());

  if (date) {
    filteredflights = filteredflights.filter((flight) => date.isSame(dayjs(flight.departureDateTime, 'YYYY-MM-DD'), 'day'));
  }

  return {
    flights: filteredflights,
    loadingFlight,
    errorFlight
  };
}

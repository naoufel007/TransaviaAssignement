import { useQueries } from '@tanstack/react-query';
import Airport from '../entities/airport';
import airportRepository from '../repositories/airport';
import { useFlightFetchAll } from './use-flight';

interface UseFetchReturn {
  airports: Airport[],
  loading: boolean,
  error: any
}

function useAirportFetchAll(airportCodes: string[]) : UseFetchReturn {
  const airportQueries = useQueries({
    queries: airportCodes.map((airportCode) => ({
      queryKey: ['airport', airportCode],
      queryFn: () => airportRepository.getAirportDataByIsoCode(airportCode),
    })),
  });
  const airports = airportQueries.map((query) => query.data).filter((data) => data !== undefined);
  const loading = airportQueries.some((query) => query.isLoading);
  const error = airportQueries.find((query) => query.error)?.error;

  return {
    airports,
    loading,
    error,
  };
}

function orderAirports(airports: Airport[]) : Airport[] {
  return airports.sort((a, b) => a.description.localeCompare(b.description));
}

export function useDepartureAirportsFetchAll() : UseFetchReturn {
  const { flights, loadingFlight, errorFlight } = useFlightFetchAll();

  const departureAirportsCode: string[] = [...new Set((flights ?? []).map((flight) => flight.departureAirport))];
  const { airports, loading: loadingAirports, error: errorAirports } = useAirportFetchAll(departureAirportsCode);

  return {
    airports: orderAirports(airports),
    loading: loadingFlight || loadingAirports,
    error: errorAirports || errorFlight,
  };
}

export function useArrivalAirportsFetchAllByOrigin(origin: string) : UseFetchReturn {
  const { flights, loadingFlight, errorFlight } = useFlightFetchAll();

  const arrivalAirportsCode: string[] = [...new Set(
    (flights ?? []).filter((flight) => flight.departureAirport.toUpperCase() === origin.toUpperCase())
      .map((flight) => flight.arrivalAirport)
  )];
  const { airports, loading: loadingAirports, error: errorAirports } = useAirportFetchAll(arrivalAirportsCode);

  return {
    airports: orderAirports(airports),
    loading: loadingFlight || loadingAirports,
    error: errorAirports || errorFlight,
  };
}

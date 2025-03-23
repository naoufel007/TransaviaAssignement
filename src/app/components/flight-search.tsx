import { useState, useEffect } from 'react';
import { Form, Button, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en';
import { useArrivalAirportsFetchAllByOrigin, useDepartureAirportsFetchAll } from '../hooks/use-airport';
import SelectAirport from './select-airport';
import { useFlightFetchByRequest } from '../hooks/use-flight';
import Flight from '../entities/flight';
import FlightsTable from './flights-table';
import Date from './date-picker';
import DisplayError from './error';

const { Title } = Typography;

const getErrorMessage = (
  departureAirportsError: Error | undefined,
  arrivalAirportsError: Error | undefined,
  errorFlight: Error | undefined
): string => {
  if (departureAirportsError?.message) {
    return departureAirportsError.message;
  }
  if (arrivalAirportsError?.message) {
    return arrivalAirportsError.message;
  }
  if (errorFlight?.message) {
    return errorFlight.message;
  }
  return '';
};

function FlightSearch({ virtual }: { virtual : boolean }) {
  const [form] = Form.useForm();
  const [selectedOrigin, setSelectedOrigin] = useState<string>('');
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [results, setResults] = useState<Flight[] | null>(null);

  const {
    airports: departureAirports,
    loading: loadingDepartureAirports,
    error: ErrorDepartureAirports
  } = useDepartureAirportsFetchAll();
  const {
    airports: arrivalAirports,
    loading: loadingArrivalAirports,
    error: ErrorArrivalAirports
  } = useArrivalAirportsFetchAllByOrigin(selectedOrigin);
  const {
    flights,
    loadingFlight,
    errorFlight
  } = useFlightFetchByRequest({ origin: selectedOrigin, destination: selectedDestination, date: undefined });

  useEffect(() => {
    setResults(null);
  }, [selectedOrigin, selectedDate]);

  const availableDepartureDates = flights.map((flight) => flight.departureDateTime);

  const handleOriginChange = (value: string) => {
    setSelectedOrigin(value);
  };

  const handleDestinationChange = (value: string) => {
    setSelectedDestination(value);
    form.setFieldValue('departureDate', null);
    setSelectedDate(null);
  };

  const handleDateChange = (date: Dayjs) => {
    setSelectedDate(date);
  };

  const onFinish = (values: any) => {
    const { departureDate } = values;
    const availableFlights = flights.filter((flight) => dayjs(flight.departureDateTime, 'YYYY-MM-DD').isSame(departureDate, 'day'));
    setResults(availableFlights ?? []);
  };

  return (ErrorDepartureAirports || ErrorArrivalAirports || errorFlight)
    ? <DisplayError errorMessage={getErrorMessage(ErrorDepartureAirports, ErrorArrivalAirports, errorFlight)} />
    : (
      <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
        <Title level={2} style={{ color: '#00A79D' }}>Where do you want to go?</Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="From" name="origin" rules={[{ required: true, message: 'Please select an airport' }]}>
            <SelectAirport
              airports={departureAirports}
              placeholder="Departure airport"
              onChange={handleOriginChange}
              disabled={loadingDepartureAirports}
              virtual={virtual}
            />
          </Form.Item>

          <Form.Item label="To" name="destination" rules={[{ required: true, message: 'Please select a destination' }]}>
            <SelectAirport
              airports={arrivalAirports}
              placeholder="Destination"
              onChange={handleDestinationChange}
              disabled={!selectedOrigin || loadingArrivalAirports}
              virtual={virtual}
            />
          </Form.Item>

          <Form.Item label="Depart on" name="departureDate" rules={[{ required: true, message: 'Please select a departure date' }]}>
            <Date
              value={selectedDate}
              onChange={handleDateChange}
              availableDates={availableDepartureDates}
              disabled={!selectedOrigin || !selectedDestination}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: '#00A79D', borderColor: '#007078' }}
              disabled={!selectedDate || loadingFlight}
              data-testid="search-btn"
            >
              Search Flights
            </Button>
          </Form.Item>
        </Form>
        { results && <FlightsTable flights={results} /> }
      </div>
    );
}

export default FlightSearch;

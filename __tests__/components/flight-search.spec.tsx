import FlightSearch from '@/app/components/flight-search';
import { render, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDepartureAirportsFetchAll, useArrivalAirportsFetchAllByOrigin } from '@/app/hooks/use-airport';
import { useFlightFetchByRequest } from '@/app/hooks/use-flight';
import mockDepartureAirports from '../mocks/departure-airport.mock';
import mockArrivalAirports from '../mocks/arrival-airport.mock';
import mockFlights from '../mocks/flight.mock';
import '../mocks/match-media.mock';
import dayjs from 'dayjs';


jest.mock('../../src/app/hooks/use-airport');
jest.mock('../../src/app/hooks/use-flight');

const useDepartureAirportsFetchAllMock = useDepartureAirportsFetchAll as jest.MockedFunction<typeof useDepartureAirportsFetchAll>;
const useArrivalAirportsFetchAllByOriginMock = useArrivalAirportsFetchAllByOrigin as jest.MockedFunction<typeof useArrivalAirportsFetchAllByOrigin>;
const useFlightFetchByRequestMock = useFlightFetchByRequest as jest.MockedFunction<typeof useFlightFetchByRequest>;

describe('FlightSearch component', () => {
    beforeEach(() => {
        useDepartureAirportsFetchAllMock.mockReset();
        useArrivalAirportsFetchAllByOriginMock.mockReset();
        useFlightFetchByRequestMock.mockReset();
    });

    it('render error loading departure airports', () => {
        useDepartureAirportsFetchAllMock.mockImplementation(() => (mockDepartureAirports.errorResult));
        useArrivalAirportsFetchAllByOriginMock.mockImplementation(() => (mockArrivalAirports.returnResult));
        useFlightFetchByRequestMock.mockImplementation(() => (mockFlights.returnResult));
        const {
            getByText
          } = render(
            <FlightSearch />
        );
        expect(getByText("error loading departure airports")).toBeInTheDocument();
    });

    it('render error loading arrival airports', () => {
        useDepartureAirportsFetchAllMock.mockImplementation(() => (mockDepartureAirports.returnResult));
        useArrivalAirportsFetchAllByOriginMock.mockImplementation(() => (mockArrivalAirports.errorResult));
        useFlightFetchByRequestMock.mockImplementation(() => (mockFlights.returnResult));
        const {
            getByText
          } = render(
            <FlightSearch />
        );
        expect(getByText("error loading arrival airports")).toBeInTheDocument();
    });

    it('render error loading flights', () => {
        useDepartureAirportsFetchAllMock.mockImplementation(() => (mockDepartureAirports.returnResult));
        useArrivalAirportsFetchAllByOriginMock.mockImplementation(() => (mockArrivalAirports.returnResult));
        useFlightFetchByRequestMock.mockImplementation(() => (mockFlights.errorResult));
        const {
            getByText
          } = render(
            <FlightSearch />
        );
        expect(getByText("error loading flights")).toBeInTheDocument();
    });

    it('render loading flights', async() => {
        useDepartureAirportsFetchAllMock.mockImplementation(() => (mockDepartureAirports.returnResult));
        useArrivalAirportsFetchAllByOriginMock.mockImplementation(() => (mockArrivalAirports.returnResult));
        useFlightFetchByRequestMock.mockImplementation(() => (mockFlights.returnResult));
        const {
            queryAllByTestId, getByTestId, getByText, getAllByRole
          } = render(
            <FlightSearch virtual={false}/>
        );
        
        const selects = queryAllByTestId("select-airport");
        const datePicker = getByTestId("date-picker");
        const searchBtn = getByTestId("search-btn");

        expect(selects).toHaveLength(2);
        expect(selects[0]).not.toHaveClass('ant-select-disabled');
        expect(selects[1]).toHaveClass('ant-select-disabled');
        expect(datePicker).toBeInTheDocument();
        expect(datePicker).toBeDisabled();
        expect(searchBtn).toBeInTheDocument();
        expect(searchBtn).toBeDisabled();

        const combobox = getAllByRole('combobox');
        //select departure airport
        const comboboxDeparture = combobox[0];
        await act(async () => {
            await userEvent.click(comboboxDeparture);
        });
        const optionsDeparture = getAllByRole('option');
        expect(optionsDeparture).toHaveLength(mockDepartureAirports.returnResult.airports.length);
        
        await act(async () => {
            await userEvent.click(optionsDeparture[0]);
        });
        expect(selects[1]).not.toHaveClass('ant-select-disabled');
        //check again that datepicker and search btn are still disabled
        expect(datePicker).toBeDisabled();
        expect(searchBtn).toBeDisabled();

        //select arrival airport
        const comboboxArrival = combobox[1];
        await act(async () => {
            await userEvent.click(comboboxArrival);
        });
        const optionsArrival = getAllByRole('option');
        expect(optionsArrival).toHaveLength(mockArrivalAirports.returnResult.airports.length);
        
        await act(async () => {
            await userEvent.click(optionsArrival[0]);
        });
        //check again that datepicker is enabled and search btn is still disabled
        expect(datePicker).toBeEnabled();
        expect(searchBtn).toBeDisabled();

        //select depart date
        const date = mockFlights.returnResult.flights[0].departureDateTime.split("T")[0];
        await act(async () => {
            fireEvent.mouseDown(datePicker);
            fireEvent.change(datePicker, { target: { value: date } });
            fireEvent.click(document.querySelectorAll(".ant-picker-cell-selected")[0]);
        });
        
        expect(datePicker).toHaveValue(date);
        //finally can click
        expect(searchBtn).toBeEnabled();

        await act(async () => {
            await userEvent.click(searchBtn);
        });

        expect(getByText("Departure Time")).toBeInTheDocument();
        expect(getByText("Arrival Time")).toBeInTheDocument();
        expect(getByText("Price (EUR)")).toBeInTheDocument();

        const flight = mockFlights.returnResult.flights[0];
        expect(getByText(dayjs(flight.departureDateTime).format("HH:mm"))).toBeInTheDocument();
        expect(getByText(dayjs(flight.arrivalDateTime).format("HH:mm"))).toBeInTheDocument();
        expect(getByText(flight.price)).toBeInTheDocument();
    }, 15000);
});
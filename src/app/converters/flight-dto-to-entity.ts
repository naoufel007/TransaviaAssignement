import Flight from '../entities/flight';

export default function flightDtoToEntity(flight: any): Flight {
  return new Flight({
    departureDateTime: flight?.outboundFlight?.departureDateTime,
    arrivalDateTime: flight?.outboundFlight?.arrivalDateTime,
    flightNumber: flight?.outboundFlight?.flightNumber,
    departureAirport: flight?.outboundFlight?.departureAirport?.locationCode,
    arrivalAirport: flight?.outboundFlight?.arrivalAirport?.locationCode,
    price: flight?.pricingInfoSum?.totalPriceAllPassengers
  });
}

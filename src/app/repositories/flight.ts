import flightDtoToEntity from '../converters/flight-dto-to-entity';
import data from '../data/flights-from-AMS.json';
import Flight from '../entities/flight';

function getFlights(): Flight[] {
  try {
    return data.flightOffer.map(flightDtoToEntity);
  } catch (error) {
    throw new Error(`Error while fetching flights, ${error}`);
  }
}

const publicMethods = {
  getFlights
};

export default publicMethods;

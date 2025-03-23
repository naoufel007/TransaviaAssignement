import airportDtoToEntity from '../converters/airport-dto-to-entity';
import airportsData from '../data/airports.json';
import Airport from '../entities/airport';

function getAllAirports(): Airport[] {
  try {
    return airportsData.Airports.map(airportDtoToEntity);
  } catch (error) {
    throw new Error(`Error while fetching airports, ${error}`);
  }
}

function getAirportDataByIsoCode(code: string) : Airport {
  const airports = getAllAirports();
  const airport = airports.find((item) => item.code.toUpperCase() === code.toUpperCase());
  if (airport === undefined) {
    throw new Error(`No airport found for the code: ${code}`);
  }
  return airport;
}

const publicMethods = {
  getAirportDataByIsoCode
};

export default publicMethods;

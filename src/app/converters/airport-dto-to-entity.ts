import Airport from '../entities/airport';

export default function airportDtoToEntity(airport: any): Airport {
  return new Airport({
    code: airport?.ItemName,
    description: airport?.Description
  });
}

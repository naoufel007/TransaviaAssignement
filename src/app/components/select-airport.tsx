import { Select } from 'antd';
import { IAirport } from '../entities/airport';

const { Option } = Select;

interface AirportSelectProps {
  airports: IAirport[];
  placeholder: string;
  onChange: (value: string) => void;
  disabled: boolean;
  virtual: boolean;
}

function SelectAirport({
  placeholder, airports, onChange, disabled, virtual
}: AirportSelectProps) {
  return (
    <Select
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      showSearch
      data-testid="select-airport"
      virtual={virtual}
    >
      {airports.map((airport) => (
        <Option key={airport.code} value={airport.code}>
          {airport.description}
        </Option>
      ))}
    </Select>
  );
}

export default SelectAirport;

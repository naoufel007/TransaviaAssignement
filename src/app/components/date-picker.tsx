import type { DatePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from 'antd';

interface DateProps {
  value: Dayjs | null;
  onChange: DatePickerProps['onChange'];
  availableDates: string[];
  disabled: boolean;
}

function Date({
  value, onChange, availableDates, disabled
}: DateProps) {
  const availableDepartureDates = availableDates.map((date) => dayjs(date, 'YYYY-MM-DD'));
  const isAllowedDate = (current: Dayjs) => availableDepartureDates.some((date) => date.isSame(current, 'day'));
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      disabledDate={(current) => !isAllowedDate(current)}
      format="YYYY-MM-DD"
      disabled={disabled}
      data-testid="date-picker"
    />
  );
}

export default Date;

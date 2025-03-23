import Date from '@/app/components/date-picker';
import { render, fireEvent } from '@testing-library/react';
import dayjs from 'dayjs';

describe('Date component', () => {
    const availableDates = ["2025-03-21", "2025-03-22"];
    const onChange = jest.fn();
    it('render a disabled', () => {
        const {
            getByTestId
          } = render(
            <Date
                value={dayjs(availableDates[0])}
                availableDates={availableDates}
                disabled={true}
                onChange={onChange}
            />
        );
        const datePicker = getByTestId("date-picker");
        expect(datePicker).toBeInTheDocument();
        expect(datePicker).toBeDisabled();
    });

    it('render a selected date', () => {
        const {
            getByTestId
          } = render(
            <Date
                value={null}
                availableDates={availableDates}
                disabled={false}
                onChange={onChange}
            />
        );
        const datePicker = getByTestId("date-picker");
        expect(datePicker).toBeInTheDocument();
        expect(datePicker).toBeEnabled();

        fireEvent.click(datePicker);
        fireEvent.change(datePicker, { target: { value: availableDates[0] } });

        expect(datePicker).toHaveValue(availableDates[0]);
    });
});
import SelectAirport from '@/app/components/select-airport';
import Airport from '@/app/entities/airport';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SelectAirport component', () => {
    const placeholder = "Select airport";
    const airports: Airport[] = [
        { code: "AMS", description: "Amsterdam, NL"},
        { code: "CDG", description: "Paris, FR"},
    ];
    const onChange = jest.fn();
    it('render a disabled component', () => {
        const {
            getByTestId
          } = render(
            <SelectAirport
                airports={airports}
                placeholder={placeholder}
                disabled={true}
                onChange={onChange}
                virtual={false}
            />
        );
        const select = getByTestId("select-airport");
        expect(select).toBeInTheDocument();
        expect(select).toHaveClass('ant-select-disabled');
    });
    
    it('select airport', async () => {
        render(
            <SelectAirport
                airports={airports}
                placeholder={placeholder}
                disabled={false}
                onChange={onChange}
                virtual={false}
            />
        );
        const select = screen.getByTestId("select-airport");
        expect(select).toBeInTheDocument();
        expect(select).not.toHaveClass('ant-select-disabled');

        await act(async () => {
            await userEvent.click(screen.getByRole('combobox'));
        });
        const options = screen.getAllByRole('option');

        expect(options).toHaveLength(2);
        expect(screen.getByText(airports[0].description)).toBeInTheDocument();
        expect(screen.getByText(airports[1].description)).toBeInTheDocument();
    });
});
import DisplayError from '@/app/components/error';
import { render } from '@testing-library/react';

describe('Error component', () => {
    it('render error message', () => {
        const msg = "this is an error msg";
        const {
            getByText
          } = render(
            <DisplayError
                errorMessage={msg}
            />
        );
        expect(getByText(msg)).toBeInTheDocument();
    });
});
import { Empty } from 'antd';

interface ErrorProps {
  errorMessage: string;
}
function DisplayError({ errorMessage }: ErrorProps) {
  return (
    <Empty
      description={(
        <p>
          {' '}
          {errorMessage}
          {' '}
        </p>
            )}
    />
  );
}

export default DisplayError;

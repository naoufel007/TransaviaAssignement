'use client';

import 'dayjs/locale/en';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FlightSearch from './components/flight-search';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FlightSearch virtual />
    </QueryClientProvider>
  );
}

export default App;

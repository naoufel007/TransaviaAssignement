import { Table } from 'antd';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import Flight from '../entities/flight';

interface FlightsTableProps {
  flights: Flight[]
}

function FlightsTable({ flights }: FlightsTableProps) {
  const columns: ColumnsType<any> = [
    { title: 'Departure Time', dataIndex: 'departureTime', key: 'departureTime' },
    { title: 'Arrival Time', dataIndex: 'arrivalTime', key: 'arrivalTime' },
    { title: 'Price (EUR)', dataIndex: 'price', key: 'price' },
  ];

  const data = flights.map((flight) => ({
    departureTime: dayjs(flight.departureDateTime).format('HH:mm'),
    arrivalTime: dayjs(flight.arrivalDateTime).format('HH:mm'),
    price: flight.price
  }));

  return (
    <div>
      {data && data?.length > 0 ? (
        <Table
          dataSource={data}
          columns={columns}
          rowKey={(record) => `${record.departureTime}-${record.arrivalTime}`}
        />
      ) : (
        <p>No flights for this request.</p>
      )}
    </div>
  );
}

export default FlightsTable;

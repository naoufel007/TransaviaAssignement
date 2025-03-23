const errorResult = {
    flights: [],
    loadingFlight: false,
    errorFlight: new Error('error loading flights')
};

const returnResult = {
    flights: [
        { departureDateTime: "2025-03-21T07:30", arrivalDateTime: "2025-03-21T09:30", price: 10.56, flightNumber: 14, departureAirport: "AMS", arrivalAirport: "CDG" }
    ],
    loadingFlight: false,
    errorFlight: null
};

export default { errorResult, returnResult };
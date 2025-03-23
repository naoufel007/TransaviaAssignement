const errorResult = {
    airports: [],
    loading: false,
    error: new Error('error loading arrival airports')
};

const returnResult = {
    airports: [
        { code: "CDG", description: "Paris, FR"},
        { code: "EIN", description: "Eindhoven, NL"}
    ],
    loading: false,
    error: null
};

export default { errorResult, returnResult };
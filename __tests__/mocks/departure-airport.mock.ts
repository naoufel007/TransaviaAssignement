const errorResult = {
    airports: [],
    loading: false,
    error: new Error('error loading departure airports')
};

const returnResult = {
    airports: [
        { code: "AMS", description: "Amsterdam, NL"}
    ],
    loading: false,
    error: null
};

export default { errorResult, returnResult };
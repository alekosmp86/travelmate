const countryReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_COUNTRIES": {
      state = [...action.payload];
      return state;
    }
    default:
      return state;
  }
};

export default countryReducer;

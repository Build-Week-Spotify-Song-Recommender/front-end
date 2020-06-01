const initialState = {
  authenticated: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHORIZATION":
      return {
        authenticated: action.payload,
      };

    default:
      return state;
  }
};

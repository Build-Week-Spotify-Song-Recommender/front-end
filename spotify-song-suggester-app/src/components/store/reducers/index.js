const initialState = {
  authenticated: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHORIZE":
      return {
        ...state,
        isRendering: true,
      };

    default:
      return state.authenticated;
  }
};

export const AUTHORIZATION = "AUTHORIZATION";

export const authorization = (boolean) => {
  return {
    type: AUTHORIZATION,
    payload: boolean,
  };
};

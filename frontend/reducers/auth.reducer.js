export const authReducer = (state, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...state,
        isLoading: false,
        userToken: action.token,
      };

    case "SIGN_IN":
      return {
        ...state,
        userToken: action.token,
      };

    case "SIGN_UP":
      return {
        ...state,
        userToken: action.token,
      };

    case "SIGN_OUT":
      return {
        ...state,
        userToken: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

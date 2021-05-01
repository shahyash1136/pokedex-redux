const initializeState = {
  loading: true,
  data: {},
  error: "",
};

const AuthReducer = (state = initializeState, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      return action.payload;

    case "LOGIN_USER":
      return action.payload;

    default:
      return state;
  }
};

export default AuthReducer;

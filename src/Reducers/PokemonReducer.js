const initailState = {
  loading: true,
  data: {},
  error: "",
};

const PokemonReducer = (state = initailState, action) => {
  switch (action.type) {
    case "POKEMON_DATA_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "POKEMON_DATA_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "POKEMON_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };

    default:
      return state;
  }
};

export default PokemonReducer;

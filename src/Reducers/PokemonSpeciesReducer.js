const initailState = {
  loading: true,
  data: {},
  error: "",
};

const PokemonSpeciesReducer = (state = initailState, action) => {
  switch (action.type) {
    case "POKEMON_SPECIES_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "POKEMON_SPECIES_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "POKEMON_SPECIES_SUCCESS":
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

export default PokemonSpeciesReducer;

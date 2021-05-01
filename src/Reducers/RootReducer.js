import { combineReducers } from "redux";

import PokemonListReducer from "./PokemonListReducer";
import PokemonReducer from "./PokemonReducer";
import PokemonSpeciesReducer from "./PokemonSpeciesReducer";
import AuthReducer from "./AuthReducer";

const RootReducer = combineReducers({
  auth: AuthReducer,
  pokemon_list: PokemonListReducer,
  pokemon_data: PokemonReducer,
  pokemon_species: PokemonSpeciesReducer,
});

export default RootReducer;

import { combineReducers } from "redux";

import PokemonListReducer from "./PokemonListReducer";
import PokemonReducer from "./PokemonReducer";
import PokemonSpeciesReducer from "./PokemonSpeciesReducer";

const RootReducer = combineReducers({
  pokemon_list: PokemonListReducer,
  pokemon_data: PokemonReducer,
  pokemon_species: PokemonSpeciesReducer,
});

export default RootReducer;

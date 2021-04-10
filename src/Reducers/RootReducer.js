import { combineReducers } from 'redux'

import PokemonListReducer from './PokemonListReducer'

const RootReducer = combineReducers({
    pokemon_list: PokemonListReducer,
})



export default RootReducer;
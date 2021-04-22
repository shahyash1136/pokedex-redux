import axios from 'axios';
import { API_URL } from '../API/Index';

export const GetPokemonSpecies = (name) => async dispatch => {
    try {

        dispatch({
            type: 'POKEMON_SPECIES_LOADING',
        })

        const res = await axios.get(`${API_URL}/pokemon-species/${name}`);


        dispatch({
            type: 'POKEMON_SPECIES_SUCCESS',
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: 'POKEMON_SPECIES_FAIL',
            payload: error.message,
        })
    }
}
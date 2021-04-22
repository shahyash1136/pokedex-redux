import axios from 'axios';
import { API_URL } from '../API/Index';

export const GetPokemonData = (name) => async dispatch => {
    try {

        dispatch({
            type: 'POKEMON_DATA_LOADING',
        })

        const res = await axios.get(`${API_URL}/pokemon/${name}`);


        dispatch({
            type: 'POKEMON_DATA_SUCCESS',
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: 'POKEMON_DATA_FAIL',
            payload: error.message,
        })
    }
}
import axios from 'axios';
import { API_URL } from '../API/Index'

export const GetPokemonList = (page) => async dispatch => {
    try {
        dispatch({
            type: 'POKEMON_LIST_LOADING',
        })

        const perPage = 20;
        const offset = (page * perPage) - perPage;

        const res = await axios.get(`${API_URL}?limit=${perPage}&offset=${offset}`);

        dispatch({
            type: 'POKEMON_LIST_SUCCESS',
            payload: res.data,
        })


    } catch (error) {
        dispatch({
            type: 'POKEMON_LIST_FAIL',
            payload: error.message,
        })
    }
}
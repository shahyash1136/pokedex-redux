const initailState = {
    loading: false,
    data: [],
    error: '',
    count: 0,
}

const PokemonListReducer = (state = initailState, action) => {
    switch (action.type) {
        case "POKEMON_LIST_LOADING":
            return {
                ...state,
                loading: true,
            }
        case "POKEMON_LIST_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case "POKEMON_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.pageNum > 1 ? [...state.data, ...action.payload.results] : action.payload.results,
                error: '',
                count: action.payload.count,
            }
        default:
            return state;
    }
}

export default PokemonListReducer;
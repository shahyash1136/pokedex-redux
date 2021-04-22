import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPokemonData } from '../Actions/PokemonAction';
import { GetPokemonSpecies } from '../Actions/PokemonSpeciesAction';

const Pokemon = (props) => {
    const pokemonName = props.match.params.pokemonName;
    const dispatch = useDispatch();
    const pokemonData = useSelector(state => state.pokemon_data);
    const pokemonSpecies = useSelector(state => state.pokemon_species);

    useEffect(() => {
        dispatch(GetPokemonData(pokemonName));
        dispatch(GetPokemonSpecies(pokemonName));
    }, [dispatch, pokemonName])


    console.log(pokemonData, pokemonSpecies)


    return (
        <div>
            Test
        </div>
    )
}

export default Pokemon;
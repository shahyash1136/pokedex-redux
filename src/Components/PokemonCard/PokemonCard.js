import React from 'react';
import { CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
    const pokemonNum = pokemon.url.split('/')[pokemon.url.split('/').length - 2]


    return (
        <NavLink to={`/pokemon/${pokemon.name}`} className="card">
            <CardImg top width="100%" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNum}.png`} alt={pokemon.name} />
            <CardBody>
                <div className="card__bottom">
                    <CardTitle className="mb-0" tag="h1">{pokemon.name}</CardTitle>
                    <CardSubtitle tag="h2" className="m-0"><i>#</i>{pokemonNum}</CardSubtitle>
                </div>
            </CardBody>
        </NavLink>
    )
}

export default PokemonCard

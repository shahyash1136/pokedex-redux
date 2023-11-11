import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { GetPokemonData } from "../Actions/PokemonAction";
import { GetPokemonSpecies } from "../Actions/PokemonSpeciesAction";
import { Container, Row, Spinner } from "reactstrap";

const TYPE_COLORS = {
  bug: "b1c12e",
  dark: "4f3a2d",
  dragon: "755edf",
  electric: "fcbc17",
  fairy: "f4b1f4",
  fighting: "d6b591",
  fire: "e73b0c",
  flying: "a3b3f7",
  ghost: "6060b2",
  grass: "74c236",
  ground: "d3b357",
  ice: "a3e7fd",
  normal: "c8c4bc",
  poison: "934594",
  psychic: "ed4882",
  rock: "b9a156",
  steel: "b5b5c3",
  water: "3295F6",
};

const Pokemon = (props) => {
  const pokemonName = props.match.params.pokemonName;
  const dispatch = useDispatch();
  const pokemonData = useSelector((state) => state.pokemon_data);
  const pokemonSpecies = useSelector((state) => state.pokemon_species);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetPokemonData(pokemonName));
    dispatch(GetPokemonSpecies(pokemonName));
  }, [dispatch, pokemonName]);

  /* if (!auth.uid) {
    return <Redirect to='/signin' />;
  } */

  let loader,
    pokemonNumber,
    imgUrl,
    name,
    height,
    weight,
    stats,
    types,
    pokemonBg,
    description,
    hetchSteps,
    eggGroup,
    abbilities,
    catcRate,
    femaleRatio,
    maleRatio,
    specialMoves;

  if (pokemonData.loading || pokemonSpecies.loading) {
    loader = (
      <div className='loader'>
        <Spinner color='dark' />
      </div>
    );
  } else {
    pokemonNumber = pokemonData.data.id.toString().padStart(3, "0");

    imgUrl =
      `${pokemonData.data.sprites.other.dream_world.front_default}` ||
      `${pokemonData.data.sprites.front_default}`;

    name = pokemonData.data.name;

    height = Math.round((pokemonData.data.height / 3.048) * 100) / 100;

    weight = Math.round((pokemonData.data.weight / 4.536) * 100) / 100;

    pokemonBg = pokemonData.data.types.map((type) => {
      return `#${TYPE_COLORS[type.type.name]}`;
    });

    let valueArr = [];
    let maxVal = pokemonData.data.stats.map((stat) => {
      return valueArr.push(stat.base_stat);
    });
    stats = pokemonData.data.stats.map((stat) => {
      let maxValue = Math.max(...valueArr);

      let statPer = Math.round((stat.base_stat / maxValue) * 100);

      return (
        <div className='pokemon__statsBox' key={stat.stat.name}>
          <div className='svgBox'>
            <svg viewBox='0 0 36 36' className='circular-chart blue'>
              <path
                className='circle-bg'
                d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'></path>
              <path
                className='circle'
                strokeDasharray={`${statPer}, 100`}
                d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                stroke={pokemonBg[0]}></path>
              <text x='18' y='20.35' className='percentage'>
                {stat.base_stat}
              </text>
            </svg>
          </div>
          <h4>{stat.stat.name}</h4>
        </div>
      );
    });

    types = pokemonData.data.types.map((type) => {
      return (
        <span
          key={type.type.name}
          style={{ backgroundColor: `#${TYPE_COLORS[type.type.name]}` }}>
          {type.type.name}
        </span>
      );
    });

    description = pokemonSpecies.data.flavor_text_entries.map((des) => {
      if (des.language.name === "en" && des.version.name === "ruby") {
        return des.flavor_text;
      }
    });

    hetchSteps = 255 * (pokemonSpecies.data.hatch_counter + 1);

    eggGroup = pokemonSpecies.data.egg_groups.map((egg) => {
      return egg.name;
    });

    abbilities = pokemonData.data.abilities.map((ability) => {
      return ability.ability.name;
    });

    catcRate = Math.round((pokemonSpecies.data.capture_rate / 255) * 100);

    /* The chance of this Pokémon being female, in eighths; or -1 for genderless. 
        1/8 * 100 = 12.5
    */
    femaleRatio = 12.5 * pokemonSpecies.data.gender_rate;

    maleRatio = 12.5 * (8 - pokemonSpecies.data.gender_rate);

    specialMoves = pokemonData.data.stats
      .filter((stat) => {
        if (stat.effort > 0) {
          return true;
        } else {
          return false;
        }
      })
      .map((stat) => {
        return `${stat.effort} ${stat.stat.name
          .toLowerCase()
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ")}`;
      })
      .join(", ");
  }

  return pokemonData.loading || pokemonSpecies.loading ? (
    loader
  ) : (
    <Container className='mt-4 mb-4 pt-5 pb-5'>
      <Row>
        <div className='pokemon'>
          <div
            className='pokemon__bg'
            style={{ backgroundColor: pokemonBg[0] }}></div>
          <div className='pokemon__header'>
            <div className='pokemon__rank'>
              <span>
                <em>#</em>
                {pokemonNumber}
              </span>
            </div>
            <div className='pokemon__type'>{types}</div>
          </div>
          <div className='pokemon__body'>
            <div className='pokemon__body--left'>
              <div className='pokemon__imgBox'>
                <img src={`${imgUrl}`} alt='' />
              </div>
              <h2 className='pokemon__name'>{name}</h2>
            </div>
            <div className='pokemon__body--right'>
              <div className='pokemon__para'>
                <p>{description}</p>
              </div>
              <div className='pokemon__stats'>{stats}</div>
            </div>
          </div>
          <hr />
          <div className='pokemon__profile'>
            <div className='pokemon__head'>
              <h2>Profile</h2>
            </div>
            <div className='pokemon__profileBox'>
              <div className='pokemon__profile--left'>
                <div className='pokemon__profileCard'>
                  <span className='left'>Height:</span>
                  <div className='right'>
                    <span>
                      {height} <em>ft</em>
                    </span>
                  </div>
                </div>
                <div className='pokemon__profileCard'>
                  <span className='left'>Weight:</span>
                  <div className='right'>
                    <span>
                      {weight} <em>lbs</em>
                    </span>
                  </div>
                </div>
                <div className='pokemon__profileCard'>
                  <span className='left'>Catch Rate:</span>
                  <div className='right'>
                    <span>
                      {catcRate}
                      <em>%</em>
                    </span>
                  </div>
                </div>
                <div className='pokemon__profileCard'>
                  <span className='left'>Gender Ratio:</span>
                  <div className='right'>
                    <span>
                      <em className='icon female'></em>
                      {femaleRatio} <em>%</em>
                    </span>
                    <span>
                      <em className='icon male'></em> {maleRatio}
                      <em>%</em>
                    </span>
                  </div>
                </div>
              </div>
              <div className='pokemon__profile--right'>
                <div className='pokemon__profileCard'>
                  <span className='left'>Egg Groups:</span>
                  <div className='right'>
                    <span>{eggGroup.join(", ")}</span>
                  </div>
                </div>
                <div className='pokemon__profileCard'>
                  <span className='left'>Hatch Steps:</span>
                  <div className='right'>
                    <span>{hetchSteps}</span>
                  </div>
                </div>
                <div className='pokemon__profileCard'>
                  <span className='left'>Abilities:</span>
                  <div className='right'>
                    <span>{abbilities.join(", ")}</span>
                  </div>
                </div>
                <div className='pokemon__profileCard'>
                  <span className='left'>EVs:</span>
                  <div className='right'>
                    <span>{specialMoves}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Pokemon;

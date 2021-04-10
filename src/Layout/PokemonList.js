import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPokemonList } from '../Actions/PokemonListAction'
import { Container, Row, Col, Spinner, Form, Button, Input } from 'reactstrap';
import PokemonCard from '../Components/PokemonCard/PokemonCard';

const PokemonList = () => {

    const dispatch = useDispatch();
    const pokemonListState = useSelector(state => state.pokemon_list);

    useEffect(() => {
        dispatch(GetPokemonList(1))
    }, [dispatch]);


    const markup = pokemonListState.loading ? <div className="loader"><Spinner color="dark" /></div> : pokemonListState.data.map(pokemon => {
        return <Col className="col-md-3 mt-3 mb-3" key={pokemon.name}>
            <PokemonCard pokemon={pokemon} />
        </Col>
    })



    return (
        <Container className="mt-4 mb-4 pt-5">
            <Form className="d-flex justify-content-center mt-4 mb-4">
                <Input type="text" placeholder="Search Pokemon" value={''} />
                <Button className="btn-success">Search</Button>
            </Form>
            <Row>
                {
                    markup
                }
            </Row>
        </Container>
    )
}

export default PokemonList

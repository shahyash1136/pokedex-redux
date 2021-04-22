import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPokemonList } from '../Actions/PokemonListAction'
import { Container, Col, Spinner, Form, Button, Input } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroll-component'
import PokemonCard from '../Components/PokemonCard/PokemonCard';

const PokemonList = () => {

    const dispatch = useDispatch();
    const pokemonListState = useSelector(state => state.pokemon_list);
    const [pageNum, setPageNum] = useState(1)

    useEffect(() => {
        dispatch(GetPokemonList(pageNum))
    }, [dispatch, pageNum]);


    const markup = pokemonListState.data.map(pokemon => {
        return <Col className="mt-3 mb-3 col-md-4 col-lg-3 col-sm-6 col-12 " key={pokemon.name}>
            <PokemonCard pokemon={pokemon} />
        </Col>
    })



    return (
        <Container className="mt-4 mb-4 pt-5 pb-5 listContainer">
            <Form className="d-flex justify-content-center mt-4 mb-4">
                <Input type="text" placeholder="Search Pokemon" />
                <Button className="btn-success">Search</Button>
            </Form>

            <InfiniteScroll
                dataLength={pokemonListState.data.length}
                loader={<div className="loader"><Spinner color="dark" /></div>}
                hasMore={true}
                next={() => setPageNum(pageNum + 1)}
                className="row"
            >
                {markup}
            </InfiniteScroll>
        </Container>
    )
}

export default PokemonList

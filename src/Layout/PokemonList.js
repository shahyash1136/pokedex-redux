import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { GetPokemonList } from "../Actions/PokemonListAction";
import { Container, Col, Spinner, Form, Button, Input } from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonCard from "../Components/PokemonCard/PokemonCard";
import { useHistory } from "react-router-dom";

const PokemonList = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [btnValue, setBtnValue] = useState("");
  const dispatch = useDispatch();
  const pokemonListState = useSelector((state) => state.pokemon_list);
  let history = useHistory();

  useEffect(() => {
    dispatch(GetPokemonList(pageNum));
  }, [dispatch, pageNum, btnValue]);

  const submitHandler = (e) => {
    e.preventDefault();
    setBtnValue(searchValue);
    history.push(`/pokemon/${searchValue}`);
  };

  const markup = pokemonListState.data.map((pokemon) => {
    return (
      <Col className='mt-3 mb-3 col-md-4 col-lg-3 col-sm-6 col-12 ' key={v4()}>
        <PokemonCard pokemon={pokemon} />
      </Col>
    );
  });

  return (
    <Container className='mt-4 mb-4 pt-5 pb-5 listContainer'>
      <Form
        className='d-flex justify-content-center mt-4 mb-4'
        onSubmit={(e) => submitHandler(e)}>
        <Input
          type='text'
          placeholder='Search Pokemon'
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <Button className='btn-success'>Search</Button>
      </Form>

      <InfiniteScroll
        dataLength={pokemonListState.data.length}
        loader={
          <div className='loader'>
            <Spinner color='dark' />
          </div>
        }
        hasMore={true}
        next={() => setPageNum(pageNum + 1)}
        className='row'>
        {markup}
      </InfiniteScroll>
    </Container>
  );
};

export default PokemonList;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PokemonList from './Layout/PokemonList';
import Pokemon from './Layout/Pokemon';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

const App = () => {
  return (

    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={PokemonList}></Route>
        <Route path="/pokemon/:pokemonName" component={Pokemon}></Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

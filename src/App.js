import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Importing Firebase Authentication Product
import "firebase/auth";
import "firebase/database";

import PokemonList from "./Layout/PokemonList";
import Pokemon from "./Layout/Pokemon";
import PageNotFound from "./Layout/PageNotFound";
import SignIn from "./Layout/SignIn";
import SignUp from "./Layout/SignUp";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

/* //Initize Firebase
firebase.initializeApp(firebaseConfig); */

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={PokemonList}></Route>
        <Route path='/pokemon/:pokemonName' component={Pokemon}></Route>
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='*' component={PageNotFound} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from "react";
import { Navbar, Home, PokemonDetails } from "./allPages";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      offset: 0,
      current: `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=16`,
      next: "",
      previous: "",
      loading: false,
    };
  }
  getPokemons = (url) => {
    this.setState({
      loading: true,
    });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          pokemons: data.results,
          next: data.next,
          previous: data.previous,
        });
        this.setState({
          loading: false,
        });
      });
  };
  componentDidMount() {
    this.getPokemons(this.state.current);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.current != this.state.current) {
      this.getPokemons(this.state.current);
    }
  }
  changeToNext = () => {
    const { next, current } = this.state;
    if (next == null) return;

    this.setState({
      current: next,
      next: null,
    });
    this.getPokemons(this.state.current);
  };
  changeToPrevious = () => {
    const { previous, current } = this.state;
    if (previous == null) return;
    this.setState({
      current: previous,
      previous: null,
    });
    this.getPokemons(this.state.current);
  };
  render() {
    const { next } = this.state;
    const { previous } = this.state;
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                {
                }
                return (
                  <Home
                    {...props}
                    pokemons={this.state}
                    changeToNext={this.changeToNext}
                    changeToPrevious={this.changeToPrevious}
                    next={next}
                    previous={previous}
                  />
                );
              }}
            />

            <Route
              path="/pokemon/:name"
              render={(props) => {
                {
                }
                return <PokemonDetails {...props} />;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

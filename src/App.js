import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
      .then(response => {
        setPokemonList(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Filter the Pokémon list based on the search term
  const filteredPokemonList = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App-header">

      <h1>1st Generation Pokemon</h1>

      <input
        type="text"
        className="search"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="pokemon-container">
        {filteredPokemonList.map(pokemon => (
          <div className="pokemon-card" key={pokemon.name}>
            <img
              className="pokemon-image"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
              alt={pokemon.name}
            />
            <p className="pokemon-name">{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>

  );
}

export default App;

import React, { Component } from 'react';
import Pokemon from './Pokemon';
import { Link, Route, Switch } from 'react-router-dom';
import Details from './Details';



class App extends Component {
	constructor(props){
		super(props);

		this.handleFilter = this.handleFilter.bind(this);

		this.state = {
			pokemonList: [], //Lista de pokemons
			pokemonName: '' //Recojo el valor del filtro
		}
	}

	componentDidMount(){

    for (let i = 1; i < 26; i++) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)//llamada a la api limitada
				.then(response => response.json()) //transformamos a json
				.then(json => {
					let pokemon = this.state.pokemonList; //los resultados de cada iteracion se guardan en el array pokemon
					pokemon.push(json);
					pokemon.sort((a, b) => { // ordenamos los elemento de menor a mayor
						if (a.id < b.id)
							return -1;
						else if (a.id > b.id)
							return 1;
						else
							return 0;
					})
					this.setState({
						pokemonList: pokemon
					});
				})
		}
	}

	//Guardamos el valor del input
	handleFilter(event){
		let inputText = event.target.value.toLowerCase();
		this.setState({
			pokemonName: inputText
		})
	}

	showPokemons(){
		let pokemonBug = this.state.pokemonList;

		//El filtrado
		pokemonBug = this.state.pokemonList.filter(pokemon =>     pokemon.name.toLowerCase().includes(this.state.pokemonName));

		return (
			<div className="card">{
				pokemonBug.map( //recorro el array
					(pokemon, i) =>
						<Pokemon key={i} image={pokemon.sprites.front_default}
										id={pokemon.id}
										name={pokemon.name}
										type={pokemon.types.map((t) => t.type.name)} /> //recorro los tipos
				)
			}</div>
		);
	}

	render() {
		return (

			<div className="container">
      <div className="header">
					<p>POKÉDEX</p>
			</div>
			<div>

				<input className="input" onChange={this.handleFilter} placeholder="Escribe el nombre de un Pokemon"></input></div>
				{this.showPokemons()}
        <Switch>
          <Route path='/details' component={ Details } />
        </Switch>
			</div>
		);
	}
}

export default App;

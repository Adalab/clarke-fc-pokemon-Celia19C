import React from 'react';

class Pokemon extends React.Component{

	render(){
		return(
			<div className="box">
				<span>#{this.props.id}</span>
				<img className="pokemon_img" src={this.props.image} alt="pokemon"/>
				<h3>{this.props.name}</h3>
				<div className="pokemon_type">
					{this.props.type}
				</div>
			</div>
		)
	}
}

export default Pokemon;

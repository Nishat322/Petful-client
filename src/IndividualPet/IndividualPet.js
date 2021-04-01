import React, { Component } from 'react'

import './IndividualPet.css'

class IndividualPet extends Component {
  static defaultProps = {
    pet: {
      name: '',
      age: '',
      breed: '',
      description: '',
      gender: '',
      imageURL: '',
      story: '',
    },
  };

  render() {
    return (
      <div className='IndividualPet'>
        <p className = 'IndividualPet__title'>
          Next available for adoption:
        </p>
        <br />
        <img src={this.props.pet.imageURL} alt='pic' />
        <div className='IndividualPet__info'>
          <p>Name: {`${this.props.pet.name}`}</p>
          <p>Age: {`${this.props.pet.age}`}</p>
          <p>Breed: {`${this.props.pet.breed}`}</p>
          <p>Description: {`${this.props.pet.description}`}</p>
          <p>Story: {`${this.props.pet.story}`}</p>
        </div>

        <button
          onClick={() => this.props.handleAdoptClick(this.props.type)}
          disabled={this.props.canAdopt}
        >
          Adopt
        </button>
      </div>
    )
  }
}

export default IndividualPet
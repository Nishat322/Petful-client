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
          Available for adoption:
        </p>
        <br />
        <img src={this.props.pet.imageURL} alt='pic' />
        <div className='IndividualPet__summary'>
          Name: Hello, My name is {`${this.props.pet.name}`}
          <p>Age: I am {`${this.props.pet.age}`} years old</p>
          <p>Breed: {`${this.props.pet.breed}`}</p>
          <p>Description: {`${this.props.pet.description}`}</p>
          <p>This is my Story: {`${this.props.pet.story}`}</p>
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
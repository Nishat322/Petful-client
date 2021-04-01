import React, { Component } from 'react'
import PetfulService from '../service/PetfulService'
import IndividualPet from '../IndividualPet/IndividualPet'

import './Pet.css'

const names = [
    'Harry',
    'Roger',
    'Robert',
    'Steven',
    'Tommy',
    'Amy',
    'Ty',
    'Yuki',
    'Bob',
]

const lastNames = [
    'Ramachandran',
    'Resnick',
    'Stein',
    'Willow',
    'Ko',
    'Haque',
    'Chowdhury',
    'Khan',
    'Umeya',
]

class Pet extends Component {
    state = {
        pets: { cat: [], dog: [] },
        canAdopt: true,
        adoptionMessage: false,
        people: [],
        name: '',
        waiting: false,
        inLine: false,
        atFront: false,
        error: null,
    }

    componentDidMount() {
        PetfulService
            .getAllPets()
            .then((pets) => {
                this.setState({ pets })
            })
            .catch((error) => this.setState({ error }))
        PetfulService
            .getPeople()
            .then((people) => this.setState({ people }))
    }

    fillQueue = () => {
        this.interval = setInterval(() => {
            let first = names[Math.floor(Math.random() * names.length)]
            let last = lastNames[Math.floor(Math.random() * lastNames.length)]

            PetfulService.postPeople(`${first} ${last}`).then(() => {
                PetfulService.getPeople()
                    .then((people) => {
                        this.setState({ people })
                        if (this.state.people.length === 5) {
                            this.setState({ adoptionMessage: true })
                            clearInterval(this.interval)
                        }
                    })
                    .catch((error) => this.setState({ error }))
            })
        }, 5000)
    }

    handleAdoptClick = (type) => {
        this.setState({ adoptionMessage: true })
        setTimeout(() => {
            PetfulService
                .dequeuePet(type)
                .then(() => {
                    PetfulService
                        .getAllPets()
                        .then((pets) => {
                            this.setState({ pets })
                        })
                        .catch((error) => this.setState({ error }))
                    })
                .then(() => {
                PetfulService
                    .deletePerson().then(() => {
                        PetfulService
                            .getPeople()
                        .then((people) => {
                            this.setState({
                            people,
                            name: '',
                            adoptionMessage: true,
                            canAdopt: true,
                            waiting: true,
                            atFront: false,
                            })
                        })
                        .catch((error) => {
                            this.setState({ error })
                        })
                    })
                })
        }, 3000)
    }

    updateUserName = (newName) => {
        this.setState({ name: newName })
    }

    UpdateWaitingList = (name) => {
        this.setState({ people: [...this.state.people, name] })
    }

    dequeuePet = () => {
        let pets = ['cat', 'dog']
        let pet = pets[Math.floor(Math.random() * pets.length)]

        PetfulService
            .dequeuePet(pet)
            .then(() => {
            PetfulService
                .getAllPets()
                .then((pets) => {
                    this.setState({ pets })
                })
                .catch((error) => this.setState({ error }))
        })
    }

    moveQueue = () => {
        this.interval = setInterval(() => {
            PetfulService
                .deletePerson()
                .then(() => {
                    this.dequeuePet()
                })
                .then(() => {
                PetfulService
                    .getPeople()
                    .then((people) => {
                        this.setState({ people })
                        if (people[0] === this.state.name) {
                            this.setState({
                                canAdopt: false,
                                atFront: true,
                                inLine: false,
                            })
                            clearInterval(this.interval)
                            this.fillQueue()
                        }
                    })
                    .catch((error) => this.setState({ error }))
                })
        }, 4000)
    }

    handleClickSubmit = (e) => {
        e.preventDefault()
        const { name } = this.state
        PetfulService
            .postPeople(name)
            .then(
                PetfulService
                    .getPeople()
                    .then((people) =>
                        this.setState({ people, waiting: true, inLine: true })
                    )
            )
            .catch((res) => {
                this.setState({ error: res.error })
            })
        this.moveQueue()
    }

    render() {
        return (
            <div className = 'Pet'>
                <div className = 'Pet__description'>
                    <h1> Adopt a Pet </h1> 
                    <p>
                            These are the pets currently available for adoption. Please join the waiting
                            list below. When it is your turn, you will be able to adopt a pet from the selection
                            below
                    </p>
                </div>
                <div className='Pet__container'>
                    <IndividualPet
                        handleAdoptClick={this.handleAdoptClick}
                        pet={this.state.pets.dog[0]}
                        type={'dog'}
                        canAdopt={this.state.canAdopt}
                    />
                    <IndividualPet
                        handleAdoptClick={this.handleAdoptClick}
                        pet={this.state.pets.cat[0]}
                        type={'cat'}
                        canAdopt={this.state.canAdopt}
                    />
                </div>
                <div className='Pet__description'>
                    {this.state.atFront && this.state.adoptionMessage === false && (
                        <h2 className = 'Pet__hidden'>
                            Your turn! Choose a pet.
                        </h2>
                    )}
                    {this.state.adoptionMessage && (
                        <h2 className = 'Pet__hidden'>
                            Congratulations, You have adopted a pet!
                        </h2>
                    )}
                    {this.state.inLine && (
                        <h2 className = 'Pet__hidden'>
                            Please wait...
                        </h2>
                    )}
                </div>
                <div className='Pet__waitinglist'>
                    <ul>
                        The Waiting List 
                        <br/>
                        {this.state.people.join(' --> ')}
                    </ul>
                    <form onSubmit={this.handleClickSubmit}>
                        <h5>Enter Your Name Below</h5>
                            <input
                                type='text'
                                id='user_name'
                                value={this.state.name}
                                onChange={(e) => this.updateUserName(e.target.value)}
                            />
                        <br />
                        <button
                            type='submit'
                            className='Pet__joinButton'
                            disabled={this.state.waiting}
                        >
                            Join the waiting list!
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Pet
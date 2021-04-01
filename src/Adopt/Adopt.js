import React, { Component } from 'react'
import PetfulService from '../service/PetfulService'
import IndividualPet from '../IndividualPet/IndividualPet'
import WaitingList from '../WaitingList/WaitingList'
import REACT_APP_API_BASE from "../config";
import fullNames from '../service/store'

import './Adopt.css'

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
        fetch(`${REACT_APP_API_BASE}/pets`)
            .then((res) =>
                !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
            )
            .catch((error) => console.error(error))
            .then((pets) => {
                this.setState({ pets })
            })
            .catch((error) => this.setState({ error }))
        fetch(`${REACT_APP_API_BASE}/people`, {
            headers: {},
        })
            .then((res) =>
                !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
            )
            .catch((error) => console.error(error))
            .then((people) => this.setState({ people }))
    }

    fillQueue = () => {
        this.interval = setInterval(() => {
            let fullName = fullNames[Math.floor(Math.random() * fullNames.length)]
            PetfulService.postPeople(`${fullName}`).then(() => {
                fetch(`${REACT_APP_API_BASE}/people`, {
                    headers: {},
                })
                    .then((res) =>
                        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
                    )
                    .catch((error) => console.error(error))
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
                    fetch(`${REACT_APP_API_BASE}/pets`)
                        .then((res) =>
                            !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
                        )
                        .catch((error) => console.error(error))
                        .then((pets) => {
                            this.setState({ pets })
                        })
                        .catch((error) => this.setState({ error }))
                    })
                .then(() => {
                PetfulService
                    .deletePerson().then(() => {
                        fetch(`${REACT_APP_API_BASE}/people`, {
                            headers: {},
                        })
                            .then((res) =>
                              !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
                            )
                            .catch((error) => console.error(error))
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

    updateUserName = (addedName) => {
        this.setState({ name: addedName })
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
                fetch(`${REACT_APP_API_BASE}/pets`)
                    .then((res) =>
                    !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
                    )
                    .catch((error) => console.error(error))
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
                fetch(`${REACT_APP_API_BASE}/people`, {
                        headers: {},
                })
                    .then((res) =>
                        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
                    )
                    .catch((error) => console.error(error))
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
                fetch(`${REACT_APP_API_BASE}/people`, {
                    headers: {},
                })
                    .then((res) =>
                      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
                    )
                    .catch((error) => console.error(error))
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
                </div>
                <div className='Pet__individual-pet'>
                    <IndividualPet
                        handleAdoptClick={this.handleAdoptClick}
                        pet={this.state.pets.dog[0]}
                        type={'dog'}
                        canAdopt={this.state.canAdopt}
                    />
                    <h2>OR </h2>
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
                <WaitingList
                    people = {this.state.people}
                    name = {this.state.name}
                    waiting = {this.state.waiting}
                    updateUserName = {this.updateUserName}
                    handleClickSubmit = {this.handleClickSubmit}
                />
            </div>
        )
    }
}

export default Pet
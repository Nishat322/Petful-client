import React, { Component } from 'react'
import IndividualPet from '../IndividualPet/IndividualPet'
import WaitingList from '../WaitingList/WaitingList'
import Process from '../Process/Process'
import REACT_APP_API_BASE from "../config";
import fullNames from '../service/store'

import './Adopt.css'

class Adopt extends Component {
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
            fetch(`${REACT_APP_API_BASE}/people`, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({ name: fullName }),
                })
                .then((res) =>
                    !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
                )
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
            fetch(`${REACT_APP_API_BASE}/pets`, {
                method: "DELETE",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ type: type }),
            })
                .then((res) =>
                    !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
                )
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
                    fetch(`${REACT_APP_API_BASE}/people`, {
                        method: "DELETE",
                    })
                        .then((res) =>
                            !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
                        )
                        .then(() => {
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

        fetch(`${REACT_APP_API_BASE}/pets`, {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ type: pet }),
        })
            .then((res) =>
                !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
            )
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
            fetch(`${REACT_APP_API_BASE}/people`, {
                method: "DELETE",
            })
                .then((res) =>
                    !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
                )
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
        }, 5000)
    }

    handleClickSubmit = (e) => {
        e.preventDefault()
        const { name } = this.state
        fetch(`${REACT_APP_API_BASE}/people`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ name: name }),
        })
            .then((res) =>
                !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
            )
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
            <div className = 'Adopt'>
                <h1> Adopt a Pet </h1> 
                <br/>
                <p>
                    Join the waiting list below. When it is your turn choose from one of the two pets displayed.
                </p>
                <br/>   
                <Process
                    atFront = {this.state.atFront}
                    adoptionMessage = {this.state.adoptionMessage}
                    inLine = {this.state.inLine}
                />     
                <WaitingList
                    people = {this.state.people}
                    name = {this.state.name}
                    waiting = {this.state.waiting}
                    updateUserName = {this.updateUserName}
                    handleClickSubmit = {this.handleClickSubmit}
                />
                <div className = 'Adopt__position'>
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
            </div>
        )
    }
}

export default Adopt
import React, { Component } from 'react'

import './LandingPage.css'

class LandingPage extends Component {
    static defaultPorps = {
        history: { push: () => {} },
    }

    handleClickAdoption = () => {
        this.props.history.push('/adopt')
    }

    render() {
        return (
            <div className='LandingPage'>   
                <div className='LandingPage__title'>
                    <h1>Welcome to Petful!</h1>
                </div>
                <div className='LandingPage__summary'>
                    <p>
                        Hello! Petful is here to help you find the best pet for you. We offer a selection of wonderful 
                        cats and dogs. On our website you will be able to see a slection between a beautiful cat or a 
                        friendly dog. People must queue up and wait for their turn in order to adopt a pet of their own. 
                        We serve on a first come and first served basis so line up today to get a new addition to your family!
                    </p> 
                </div>
                <div className='LandingPage__adopt'>
                    <button
                        type='button'
                        className='button'
                        onClick={this.handleClickAdoption}
                    >
                        Start your adoption
                    </button>
                </div>
                    <br/>
                    <img
                        className='LandingPage__image'
                        src={require('./catanddog.jpg')}
                        alt='cat-with-dog-img'
                    />   
            </div>
        )
    }
}

export default LandingPage
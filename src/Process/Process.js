import React, { Component } from 'react'
import './Process.css'

class Process extends Component {
    render() { 
        return (  
            <div className = 'Process'>
                {this.props.atFront && this.props.adoptionMessage === false && (
                    <h2 className = 'Process__hidden'>
                        Your turn! Choose a pet.
                    </h2>
                )}
                {this.props.adoptionMessage && (
                    <h2 className = 'Process__hidden'>
                        Congratulations, You have adopted a pet!
                    </h2>
                )}
                {this.props.inLine && (
                    <h2 className = 'Process__hidden'>
                        Please wait...
                    </h2>
                )}
            </div>
        )
    }
}
 
export default Process;
import React, { Component } from 'react'
import './WaitingList.css'

class WaitingList extends Component {
    render() { 
        return (  
            <div className = 'WaitingList'>
                <form onSubmit={this.props.handleClickSubmit}>
                    <h5>Enter Your Name Below</h5>
                        <input
                            type='text'
                            id='user_name'
                            value={this.props.name}
                            onChange={(e) => this.props.updateUserName(e.target.value)}
                        />
                    <br />
                    <button
                        type='submit'
                        className='WaitingList__joinButton'
                        disabled={this.props.waiting}
                    >
                        Join the waiting list!
                    </button>
                </form>
                <br/>
                <ul>
                        <h4>People waiting to adopt a pet </h4>
                        {this.props.people.map((person, index )=> 
                                <li key = {index}>{person}</li>  
                            )}
                </ul>
            </div>
        )
    }
}
 
export default WaitingList;
import React, { Component } from 'react'
import './WaitingList.css'

class WaitingList extends Component {
    render() { 
        console.log(this.props)
        return (  
            <div className = 'WaitingList'>
                <ul>
                        People waiting to adopt a pet 
                        <br/>
                        {this.props.people.map(person => 
                                <li>{person}</li>
                            )}
                </ul>
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
                        className='Pet__joinButton'
                        disabled={this.props.waiting}
                    >
                        Join the waiting list!
                    </button>
                </form>
            </div>
        )
    }
}
 
export default WaitingList;
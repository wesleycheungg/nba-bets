import React from 'react';
import { Link } from 'react-router-dom';
import NavBarContainer from '../nav/navbar_container'

class Profile extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.props.getBets(this.props.currentUser.id)
    }

    render() {
        return(
            <div className="profile-container">
                <NavBarContainer />
                <div className="profile-body-container">
                    <div className="profile-body-header">{this.props.currentUser.handle}</div>
                    <div className="profile-body">games go here</div>

                </div>
            </div>
        )
    }
}

export default Profile;
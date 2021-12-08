import React from 'react';
import { Link } from 'react-router-dom';
import NavBarContainer from '../nav/navbar_container'

class Profile extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div className="profile-container">
                <NavBarContainer />
                <div>
                    <div>{this.props.currentUser.handle}</div>
                </div>
            </div>
        )
    }
}

export default Profile;
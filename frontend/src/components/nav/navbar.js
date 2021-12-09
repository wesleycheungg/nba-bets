import React from 'react';
import { Link } from 'react-router-dom'
import { logout } from '../../actions/session_actions';
import logo from '../../images/smallest-logo.JPG'
// import './navbar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.updateCurrency = this.updateCurrency(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  updateCurrency() {

  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
          <div>
            <nav className="nav-bar-container">
                <Link className="logo" to={'/main'}><img src={logo}></img></Link>
                <button className="currency-deposit">Deposit</button>
                <div className="currency-header" onClick={this.updateCurrency}>Balance: </div>
                <div className="currency-amt">{this.props.user.currency}</div>
                <button className="profile-btn"><Link to={'/profile'}>Profile</Link></button>
                <button className="logout-btn" onClick={this.logoutUser}>Logout</button>
            </nav>
            {/* <div className="currency-container">
              <div className="currency-header">Balance: </div>
              <div className="currency-amt">{this.props.user.currency}</div>
            </div> */}

          </div>
        );
      } else {
        return (
            <nav className="nav-bar-container">
                <Link className="logo" to={'/main'}><img src={logo}></img></Link>
                <Link className="signup-btn" to={'/signup'}>Sign Up</Link>
                <Link className="login-btn" to={'/login'}>Log In</Link>
            </nav>
        );
      }
  }

  render() {
      return (
        <div>
            { this.getLinks() }
        </div>
      );
  }
}

export default NavBar;
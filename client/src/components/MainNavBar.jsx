import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

const Nav = styled.div`
width: 95%;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 2.5%;
background-color: rgba(228, 16, 12, 1);
box-shadow: 0px 1px 6px black;
a {
  text-decoration: none;
  margin: 0 5px;
  &:visited {
    color: white;
  }
}
`;

const MarvelFont = styled.div`
 h1 {
   font-family: 'Bangers', cursive;
 }
`

export default class MainNavBar extends Component {
  constructor(){
    super();
    this.state = {
      user: {},
      loggedIn: false

    }
  }

  componentWillMount() {
    this._isLoggedIn();
  }
  componentWillReceiveProps() {
    this._isLoggedIn();
  }

  _isLoggedIn = async () => {
    const response = await axios.get("/auth/validate_token");
    this.setState({
      user: response.data.data,
      loggedIn: response.data.success
    });
  };
  
  _logOut = async () => {
    console.log("CLICK");
    const response = await axios.delete("/auth/sign_out");
    //Forces refresh of browser
    window.location.reload();
  };

  
  render() {
    if (this.state.loggedIn) {
      return (
        <Nav>
        <Link to="/">
          <MarvelFont>
            <h1>Marvel</h1>
          </MarvelFont>
         
        </Link>
        <div>
            <span>Signed In As: {this.state.user.email}</span>
            <Link to='#'>My Profile</Link>
            <a href="#" onClick={this._logOut}> Log Out </a>
        </div>
        </Nav>
      )
    } else {
    return (

      
      
      <Nav>
          
          <h2><Link to='/'>MARVELous</Link></h2>

          <div>
            <Link to='/hello'>Sign Up</Link>
            <Link to='/signin'>Sign In</Link>
          </div>
        
      </Nav>
    )
  }
  }
}

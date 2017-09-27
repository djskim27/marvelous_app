import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import {Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl} from 'react-bootstrap';
import {TiArrowForward} from 'react-icons/lib/ti'
import {MdSearch} from 'react-icons/lib/md'


// const Nav = styled.div`
// width: 95%;
// display: flex;
// justify-content: space-between;
// align-items: center;
// padding: 0 2.5%;
// background-color: rgba(228, 16, 12, 1);
// box-shadow: 0px 1px 6px black;
// a {
//   text-decoration: none;
//   margin: 0 5px;
//   &:visited {
//     color: white;
//   }
// }
// `;

const MarvelFont = styled.div`
 p {
   font-family: 'Bangers', cursive;
   font-size: 30px;
   color: white;
 }
`

const NavItemMarvelFont = styled.div`
p {
  font-family: 'Bangers', cursive;
  font-size: 20px;
  color: white;
}
  
`

class MainNavBar extends Component {
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
  
  _logOut = async (history) => {
    console.log("CLICK");
    const response = await axios.delete("/auth/sign_out");
    //Forces refresh of browser
    window.location.reload();
    this.props.history.push('/')

  };

  
  render() {
    return(
      <div>
      <Navbar inverse collapseOnSelect className='custom-nav' fixedTop>

        <Navbar.Header>
        <Navbar.Brand className='nav-brand'>
        <Link to="/" onClick={this.props.setDefault}>
          <MarvelFont>
            <p>Marvelous</p>
          </MarvelFont>
        </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        <Navbar.Form pullLeft>
          <FormGroup>
            <FormControl onChange={this.props.handleChange} type="text" name="input" value={this.props.input} placeholder="Search For A Comic"className='search' />
          </FormGroup>
          {' '}
          <button onClick={this.props.searchMarvelData} className="btn search-submit"><TiArrowForward size={18} color='white'/></button>
      </Navbar.Form>
        
        <Nav>
           

        </Nav>
        {this.state.loggedIn?
          <Nav pullRight>

            
            <NavItem eventKey={1} className='nav-item'><Link to='/profile' className='a-remove-decoration'>{this.state.user.nickname}</Link></NavItem>
         
            <NavItem eventKey={2} className='nav-item' onClick={this._logOut}>Log Out</NavItem>
            
        </Nav>
        :
        <Nav pullRight>
            
            
            <NavItem eventKey={1} className='nav-item'><Link to='/signup' className='a-remove-decoration'>Sign Up</Link></NavItem>
         
            <NavItem eventKey={2} className='nav-item'><Link to='/signin' className='a-remove-decoration'>Sign In</Link></NavItem>
            
        </Nav>
        }
 
        </Navbar.Collapse>

        </Navbar>
      </div>
    )
  //   if (this.state.loggedIn) {
  //     return (
  //       <Nav>

  //       <div>
  //           <span>Signed In As: {this.state.user.email}</span>
  //           <Link to='/profile'>My Profile</Link>
  //           <a href="/signin" onClick={this._logOut}> Log Out </a>
  //       </div>
  //       </Nav>
  //     )
  //   } else {
  //   return (

      
      
  //     <Nav>
          
  //         <Link to="/">
  //         <MarvelFont>
  //           <h1>Marvel</h1>
  //         </MarvelFont>
  //       </Link>

  //         <div>
  //           <Link to='/signup'>Sign Up</Link>
  //           <Link to='/signin'>Sign In</Link>
  //         </div>
        
  //     </Nav>
  //   )
  // }

  }
}
export default withRouter(MainNavBar);
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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


export default class MainNavBar extends Component {
  render() {
    return (
      <Nav>
          
          <h2><Link to='/'>MARVELous</Link></h2>

          <div>
            <Link to='#'>Sign Up</Link>
            <Link to='#'>Sign In</Link>
          </div>
        
      </Nav>
    )
  }
}

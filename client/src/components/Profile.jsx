import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import '../App.css';
import {Link} from 'react-router-dom'


const ProfileContainer = styled.div`
  background: white;
`

export default class Profile extends Component {
  constructor(){
    super();
    this.state = {
      user: {}
    }
  }

  componentWillMount(){
    this._fetchCurrentUser();
  }

  _fetchCurrentUser = async () => {
    try {
    const res = await axios.get('/api/users');
    this.setState({user: res.data})
    console.log(res.data)
    } 
    catch(err) {
      console.log(err)
    }

  }
  
  render() {
    return (
      <ProfileContainer>
        <div className='App'>
        <h1>Username: {this.state.user.nickname}</h1>
        <img src={this.state.user.image}/>
        <h3>Email: {this.state.user.email}</h3>
        <h3>Created At: {this.state.user.created_at}</h3>
        <h3>Updated At: {this.state.user.updated_at}</h3>
        <Link to='/profile/edit'><button>Edit Profile</button></Link>
        <button>Delete Profile</button>

        </div>
        
      </ProfileContainer>
    )
  }
}

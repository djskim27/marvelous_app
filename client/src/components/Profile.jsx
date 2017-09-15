import React, { Component } from 'react'
import axios from 'axios';
import styled, {ThemeProvider} from 'styled-components';
import '../App.css';
import {Link} from 'react-router-dom'



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

  _deleteCurrentUser = async () => {
    try {
      const res = await axios.delete('/auth');
      this._logout();
      return res.data
    } 
    catch(err) {
      console.log(err);
    }
  }

  _logOut = async () => {
    console.log("CLICK");
    const response = await axios.delete("/auth/sign_out");
    
    
  };

  _fetchComicCollection = async () => {}

  
  
  render() {
 
  const ProfileContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70%;
    margin-top: 5%;
  `
  
  const ProfileDescription = styled.div`
    background: rgba(255,255,255,0.5) url(${props => this.props.background.url});
    background-size: cover;
    border: white 5px solid;
    padding: 20%;
    
    h1 {
      color: black;
      font-family: 'Bangers', cursive;
      font-size: 50px;
    }
    h3 {
      color: black;
      font-family: 'Boogaloo', cursive;
    }
  `
  const ProfileWrapper = styled.div`
    background: rgba(255,255,255,0.8);
    margin: -20%
    

  `
  const ImgDiv = styled.div`
  img {
    border: white 2px solid;
    -moz-box-shadow:    1px 1px 3px 4px #ccc;
    -webkit-box-shadow: 2px 2px 3px 4px #ccc;
    box-shadow:         1px 2px 3px 4px black;
    
  }
  `
    return (
      <ProfileContainer class='container'>
        <div>
          <ThemeProvider theme={this.props.background}>
          <ProfileDescription className='App'>
            <ProfileWrapper>
          <h1>{this.state.user.nickname}</h1>
          <ImgDiv><img src={this.state.user.image}/></ImgDiv>
          
          <h3><strong>Email:</strong> {this.state.user.email}</h3>
          <h3>Created At: {this.state.user.created_at}</h3>
          <h3>Updated At: {this.state.user.updated_at}</h3>
          <Link to='/profile/edit'><button>Edit Profile</button></Link>

          <a href='/signup'><button onClick={this._deleteCurrentUser}>Delete Profile</button></a>
          <Link to={'/collection'}>View Comic Collection</Link>
          </ProfileWrapper>
          </ProfileDescription>
          </ThemeProvider>
        </div>
        
      </ProfileContainer>
    )
  }
}

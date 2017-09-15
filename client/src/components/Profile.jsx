import React, { Component } from 'react'
import axios from 'axios';
import styled, {ThemeProvider} from 'styled-components';
import '../App.css';
import {Link} from 'react-router-dom'
import Moment from 'react-moment'


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
    box-shadow: inset 0 1px 2px rgba(0,0,0,.39), 0 -1px 1px #FFF, 0 1px 0 #FFF;
    
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
    background: rgba(255,255,255,0.7);
    border:white 2px solid;
    -moz-box-shadow:    1px 1px 2px 3px black;
    -webkit-box-shadow: 1px 1px 2px 3px black;
    box-shadow:         1px 1px 2px 3px black;
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
          <div className='text-left'>
          <h3><strong>Email:</strong> {this.state.user.email}</h3>
          <h3><strong>Member Since:</strong> <Moment format="MM/DD/YYYY">{this.state.user.created_at}</Moment></h3>
          </div>
        
          <Link to='/profile/edit'><button className='btn marvel-btn2'>Edit Profile</button></Link>

          <a href='/signup'><button onClick={this._deleteCurrentUser} className='btn marvel-btn2'>Delete Profile</button></a>
       
   
          <Link to={'/collection'}><button className='btn marvel-btn2'>Comic Collection</button></Link>
          </ProfileWrapper>
          </ProfileDescription>
          </ThemeProvider>
        </div>
        
      </ProfileContainer>
    )
  }
}

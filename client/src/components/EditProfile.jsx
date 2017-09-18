import React, { Component } from 'react';
import axios from 'axios';
import GiphySelect from 'react-giphy-select';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import 'react-giphy-select/lib/styles.css';

const Container = styled.div`
margin-top: 5%;
display:flex;
justify-content: center;
align-items: center;
`

const ButtonDiv = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
img {
  border: white 2px solid;
  -moz-box-shadow:    1px 1px 3px 4px #ccc;
  -webkit-box-shadow: 2px 2px 3px 4px #ccc;
  box-shadow:         1px 2px 3px 4px black;
}
`
export default class EditProfile extends Component {
  constructor(){
    super();
    this.state = {
      user: {
        image:'',
        nickname:''
      },
      redirect: false,
      useGiphy: false
    }
  }
  componentWillMount(){
    this._getProfileData()
  }
  _getProfileData = async () => {
    const res = await axios.get('/api/users')
    this.setState({user: {
      image: res.data.image,
      nickname: res.data.nickname
    }});
    console.log(res.data)
    return res.data
  }

  _handleChange =(e) => {
    const attributeName = e.target.name;
    const attributeValue = e.target.value;
    const user = {...this.state.user}
    user[attributeName]=attributeValue;
    this.setState({user});
}

  _editUser = async (e) => {
    e.preventDefault();
    const payload = this.state.user
    try {
      const res = await axios.patch('/auth', payload)
      this.setState({redirect: true})
      return res.data
     
    }
    catch (err){
      console.log(err)
    }
  }

  _useGiphy = (e) => {
    e.preventDefault();
    this.setState({useGiphy: true})
  }

  render() {
    return (
      <Container>
        {this.state.redirect?
        <Redirect to='/profile' />
        :
          <div>
         
         <form onSubmit={this._editUser} className='form text-center'>
          <div className = 'text-center comic-title'>
          <h1>Edit User</h1>
          </div>

          <div>
            <label htmlFor="nickname">Username: </label>
            <input onChange={this._handleChange} type="text" name="nickname" placeholder={this.state.user.nickname}/>
          </div>

          
          <div>
            <label htmlFor="image">Profile Pic: </label>
            <input onChange={this._handleChange} type="text" name="image"  placeholder={this.state.user.image} />
          </div>
          <br/>

          <ButtonDiv>   
            <img src={this.state.user.image} />
            <br/>
            <button className='btn marvel-btn'>Submit</button> 
          </ButtonDiv>
        
        
        </form>
        <br/>
        <ButtonDiv>
        {this.state.useGiphy? <GiphySelect className='giphy'/> : <button className='btn marvel-btn' onClick={this._useGiphy}>GIPHY</button> }
        </ButtonDiv>
        </div>
        }

      </Container>
    )
  }
}

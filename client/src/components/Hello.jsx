import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import GiphySelect from 'react-giphy-select';
import 'react-giphy-select/lib/styles.css';
import styled from 'styled-components';
import {saveAuthTokens} from '../util'

const FormContainer = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
`
const SignIn = styled.div`
  margin-top: 5%;
  background: rgba(255,255,255, 0.6)

`

class Hello extends Component {
 constructor(){
   super();
   this.state = {

       email: '',
       nickname: '',
       password: '',
       password_confirmation: '',
       image:'',
       redirect: false,
       useGiphy: false
   }
 }

 _signUp = async (e) => {
  e.preventDefault();
  const payload = {
    email: this.state.email,
    nickname: this.state.nickname,
    password: this.state.password,
    password_confirmation: this.state.password_confirmation,
    image: this.state.image
  }
  const response = await axios.post('/auth', payload)
  
  saveAuthTokens(response.headers)
  this._createNewCollection();
  this.setState({redirect: true})
}

_createNewCollection = async () => {
    const res = await axios.post('/api/collections')
}
 _signIn = (e) => {
   e.preventDefault();
   this.setState({redirect: true})
 }

 _handleChange = (e) => {
   const newState = {...this.state};
   newState[e.target.name] = e.target.value;
   this.setState(newState);
 }

 _useGiphy = (e) => {
   e.preventDefault();
   this.setState({useGiphy: true})
 }
 render() {
   if (this.state.redirect){
     return <Redirect to="/" />
   }
   return (
     <SignIn className='container'>
     <FormContainer className='text-right'>
       <form onSubmit={this._signUp}>
         <div>
           <label htmlFor="email">E-mail: </label>
           <input onChange={this._handleChange} type="text" name="email" value={this.state.email} />
         </div>
         <div>
           <label htmlFor="nickname">Nickname: </label>
           <input onChange={this._handleChange} type="text" name="nickname" value={this.state.nickname} />
         </div>
         <div>
           <label htmlFor="password">Password: </label>
           <input onChange={this._handleChange} type="text" name="password" value={this.state.password} />
         </div>
         <div>
           <label htmlFor="password">Confirm Password: </label>
           <input onChange={this._handleChange} type="text" name="password_confirmation" value={this.state.password_confirmation} />
         </div>
         <div>
           <label htmlFor="image">Profile GIF </label>
           <input onChange={this._handleChange} type="text" name="image" value={this.state.image} />
         </div>
         <br/>
         <FormContainer>
         <button className='btn marvel-btn'>Sign Up</button>
         </FormContainer>
       </form>
      
       
      
     </FormContainer>
        <br/>
        <FormContainer>
       {this.state.useGiphy? <GiphySelect className='giphy'/> : <button className='btn marvel-btn' onClick={this._useGiphy}>GIPHY</button> }
       </FormContainer>
     </SignIn>
   );
 }
}

export default Hello;
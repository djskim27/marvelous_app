import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {saveAuthTokens} from '../util'
import styled from 'styled-components'


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
`
class SignIn extends Component {
 constructor(){
   super();
   this.state = {
       email: '',
       password: '',
       
       redirect: false
   }
 }


 _signIn = async (e) => {
    e.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.password
    }
    const response = await axios.post('/auth/sign_in', payload)
    saveAuthTokens(response.headers)
    this.setState({redirect: true})
 }

 _handleChange = (e) => {
   const newState = {...this.state};
   newState[e.target.name] = e.target.value;
   this.setState(newState);
 }

 render() {
   if (this.state.redirect){
     return <Redirect to="/" />
   }
   return (
     <Container className='text-right'>
       <form onSubmit={this._signIn} className='form'>
         <div>
           <label htmlFor="email">E-mail: </label>
           <input onChange={this._handleChange} type="text" name="email" value={this.state.email} />
         </div>
         <div>
           <label htmlFor="password">Password: </label>
           <input onChange={this._handleChange} type="text" name="password" value={this.state.password} />
         </div>

         <ButtonDiv>
         <button className='btn marvel-btn'>Log In</button>
         <p>Not a user? Sign up <a href='/signup'>here</a></p>

         </ButtonDiv>
       </form>
     </Container>
   );
 }
}

export default SignIn;
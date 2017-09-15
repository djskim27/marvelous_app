import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {saveAuthTokens} from '../util'
import styled from 'styled-components'

const FormContainer = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`

const Middle = styled.div`
  background: rgba(255,255,255,0.8)
 
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
     <FormContainer>
       <Middle className='text-right'>
       <form onSubmit={this._signIn}>
         <div>
           <label htmlFor="email">E-mail: </label>
           <input onChange={this._handleChange} type="text" name="email" value={this.state.email} />
         </div>
         <div>
           <label htmlFor="password">Password: </label>
           <input onChange={this._handleChange} type="text" name="password" value={this.state.password} />
         </div>

         
         <button className='btn marvel-btn text-center'>Log In</button>
       
       </form>
       </Middle>


     </FormContainer>
   );
 }
}

export default SignIn;
import React, { Component } from 'react';
import axios from 'axios';
import GiphySelect from 'react-giphy-select';
import {Redirect} from 'react-router-dom';
import 'react-giphy-select/lib/styles.css';


export default class EditProfile extends Component {
  constructor(){
    super();
    this.state = {
      user: {
        image:'',
        nickname:''
      },
      redirect: false
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
  render() {
    return (
      <div>
        {this.state.redirect?
        <Redirect to='/profile' />
        :
          <div>
          <img src={this.state.user.image} />
          <form onSubmit={this._editUser}>
          <div>
            <label htmlFor="image">Profile Pic: </label>
            <input onChange={this._handleChange} type="text" name="image"  placeholder={this.state.user.image} />
          </div>
          <div>
            <label htmlFor="nickname">Username: </label>
            <input onChange={this._handleChange} type="text" name="nickname" placeholder={this.state.user.nickname}/>
          </div>

          
          <button>Submit</button>
        
        </form>
        <GiphySelect />
        </div>
        }

      </div>
    )
  }
}

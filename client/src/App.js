import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import md5 from 'md5';


class App extends Component {
  constructor(){
    super();
    this.state = {
      marvelData: {},
      input: ''
    }
  }

  componentWillMount(){
    this._setDefaultMarvelData();
  }

  _handleChange = (e) => {
    const newState = {...this.state};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  _setDefaultMarvelData = async () => {
    const publicKey = process.env.REACT_APP_PUBLIC_API_KEY;
    const privateKey = process.env.REACT_APP_PRIVATE_API_KEY;
    const ts = Date.now();
    const hash = md5(ts + privateKey + publicKey)
    const url = `https://gateway.marvel.com/v1/public/characters?name=wolverine&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    console.log(url)
    try {
      const res = await axios.get(url);
      await this.setState({marvelData: res.data.data.results[0].thumbnail});
      return res.data.data.results[0].thumbnail;

    } catch (err) {
      console.log(err)
    }

  }

  _getMarvelData = async (e) => {
    e.preventDefault();
    const publicKey = process.env.REACT_APP_PUBLIC_API_KEY;
    const privateKey = process.env.REACT_APP_PRIVATE_API_KEY;
    const ts = Date.now();
    const hash = md5(ts + privateKey + publicKey)
    const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${this.state.input}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    console.log(url)
    try {
      const res = await axios.get(url);
      await this.setState({marvelData: res.data.data.results[0].thumbnail});
      return res.data.data.results[0].thumbnail;

    } catch (err) {
      console.log(err)
    }

  }


  render() {
    return (
      <div className="App">
        <h1>MARVELous</h1>
        <form onSubmit={this._getMarvelData}>
         <div>
           <label htmlFor="input">Search for a hero </label>
           <input onChange={this._handleChange} type="text" name="input" value={this.state.input} />
         </div>
          
         
         <button>Search</button>
    
       </form>
       <img src={`${this.state.marvelData.path}.jpg`}/>
      </div>
    );
  }
}

export default App;

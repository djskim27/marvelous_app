import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import md5 from 'md5';
import MainNavBar from './components/MainNavBar'
import HomePage from './components/HomePage'
import ComicIndex from './components/ComicIndex'
import ComicShow from './components/ComicShow'


class App extends Component {
  constructor(){
    super();
    this.state = {
      marvelData: [],
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
    const url = `https://gateway.marvel.com/v1/public/comics?limit=100&offset=1500&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    
    try {
      const res = await axios.get(url);
      await this.setState({marvelData: res.data.data.results});
      console.log(this.state.marvelData)
      return res.data.data.results;
      

    } catch (err) {
      console.log(err)
    }

  }

  // _getMarvelData = async (e) => {
  //   e.preventDefault();
  //   const publicKey = process.env.REACT_APP_PUBLIC_API_KEY;
  //   const privateKey = process.env.REACT_APP_PRIVATE_API_KEY;
  //   const ts = Date.now();
  //   const hash = md5(ts + privateKey + publicKey)
  //   const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${this.state.input}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
  //   console.log(url)
  //   try {
  //     const res = await axios.get(url);
  //     await this.setState({marvelData: res.data.data.results[0].thumbnail});
  //     return res.data.data.results[0].thumbnail;

  //   } catch (err) {
  //     console.log(err)
  //   }

  // }


  render() {
    return (
      <Router>
        <div>
          <MainNavBar />
          <div className="App">
            <h1>MARVELous</h1>
            {/* <form onSubmit={this._getMarvelData}>
            <div>
              <label htmlFor="input">Search for a hero </label>
              <input onChange={this._handleChange} type="text" name="input" value={this.state.input} />
            </div>
              
            
            <button>Search</button>
        
          </form>
          <img src={`${this.state.marvelData.path}.jpg`}/> */}
          </div>
        <Route exact path = '/'  render={routeProps => 
          <HomePage {...routeProps} comics = {this.state.marvelData}/>}
          />
        <Route exact path = '/:comicId' />
        </div>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import md5 from 'md5';
import MainNavBar from './components/MainNavBar';
import HomePage from './components/HomePage';
import ComicIndex from './components/ComicIndex';
import ComicShow from './components/ComicShow';
import SignIn from './components/SignIn';
import Hello from './components/Hello';
import SearchBar from './components/SearchBar'
import {setAxiosDefaults} from './util';


class App extends Component {
  constructor(){
    super();
    this.state = {
      marvelData: [],
      input: ''
    }
  }

  componentWillMount(){
   setAxiosDefaults();
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
    const url = `http://gateway.marvel.com/v1/public/comics?limit=20&offset=1500&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    console.log(url)
    
    try {
      const res = await axios.get(url, 
        { transformRequest: [(data, headers) => {
          delete headers['access-token']
          delete headers['uid']
          delete headers['client']
          delete headers['expiry']
          delete headers['token-type']
          delete headers.common
          return data;
        }]
      });
      this.setState({marvelData: res.data.data.results});
      console.log(this.state.marvelData)
      return res.data.data.results;
      

    } catch (err) {
      console.log(err)
    }

  }

  _searchMarvelData = async (e) => {
    e.preventDefault();
    const publicKey = process.env.REACT_APP_PUBLIC_API_KEY;
    const privateKey = process.env.REACT_APP_PRIVATE_API_KEY;
    const ts = Date.now();
    const hash = md5(ts + privateKey + publicKey)
    const url = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${this.state.input}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    console.log(url)
    try {
      const res = await axios.get(url,
        { transformRequest: [(data, headers) => {
          delete headers['access-token']
          delete headers['uid']
          delete headers['client']
          delete headers['expiry']
          delete headers['token-type']
          delete headers.common
          return data;
        }]
      });
      this.setState({marvelData: res.data.data.results});
      return res.data.data.results;

    } catch (err) {
      console.log(err)
    }

  }


  render() {
    return (
      <Router>
        <div>
          <MainNavBar />
          <div className="App">
            <SearchBar handleChange={this._handleChange} searchMarvelData={this._searchMarvelData} input={this.state.input}/>
          </div>
        <Route exact path = '/'  render={routeProps => 
          <HomePage {...routeProps} comics = {this.state.marvelData}/>}
          />
        <Route exact path = '/comics/:id' component={ComicShow}/>
      
        <Route exact path = '/signin' component={SignIn} />
        <Route exact path = '/hello' component ={Hello} />
        </div>
      </Router>
    );
  }
}

export default App;

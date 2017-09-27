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
import SignUp from './components/SignUp';
import SearchBar from './components/SearchBar';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import ComicCollection from './components/ComicCollection';
import {setAxiosDefaults} from './util';
import Modal from 'react-modal';



class App extends Component {
  constructor(){
    super();
    this.state = {
      marvelData: [],
      input: '',
      userComicCollection:[],
      isActive: false,

      backgroundImage: 'http://i.annihil.us/u/prod/marvel/i/mg/5/03/599b01410a695.jpg'
      
    }
  }

  componentWillMount(){
   setAxiosDefaults();
    this._setDefaultMarvelData();
    Modal.setAppElement('body');
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

  _searchMarvelData = async (e) => {
    e.preventDefault();
    const publicKey = process.env.REACT_APP_PUBLIC_API_KEY;
    const privateKey = process.env.REACT_APP_PRIVATE_API_KEY;
    const ts = Date.now();
    const hash = md5(ts + privateKey + publicKey)
    const url = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${this.state.input}&limit=24&offset=10&ts=${ts}&apikey=${publicKey}&hash=${hash}`
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

  _fetchUserComicCollection = async() => {
    try {
      const res = await axios.get('/api/comics');
      this.setState({userComicCollection: res.data})
      return res.data
    }
    catch(err) {

    }

  }

  _toggleModal = () => {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  _setBackGroundImage = (imgUrl) => {
    this.setState({backgroundImage: imgUrl})
  }

  render() {
    const background = {
    url: this.state.backgroundImage
  }
    return (
      <Router>
        <div>
          <MainNavBar  handleChange={this._handleChange} searchMarvelData={this._searchMarvelData} input={this.state.input} setDefault={this._setDefaultMarvelData}/>




        <Route exact path = '/'  render={routeProps => 
          <HomePage {...routeProps} comics = {this.state.marvelData} toggleModal ={this._toggleModal} style={this.customStyles}/>}
          />
        {/* <Route exact path = '/comics/:id' component={ComicShow}/> */}
      
        <Route exact path = '/signin' component={SignIn} />
        <Route exact path = '/signup' component ={SignUp} />
        {/* <Route exact path = '/profile' component ={Profile}/> */}
        <Route exact path = '/profile'  render={routeProps => 
          <Profile {...routeProps} background = {background}/>}/>

        <Route exact path = '/profile/edit' component ={EditProfile}/>
        <Route exact path = '/collection' render={routeProps => 
          <ComicCollection {...routeProps} fetchUserComicCollection={this._fetchUserComicCollection } userComicCollection = {this.state.userComicCollection} backgroundImage = {this._setBackGroundImage}/>} 
          />
        </div>
      </Router>
    );
  }
}

export default App;

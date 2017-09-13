import React, { Component } from 'react';
import axios from 'axios';
import md5 from 'md5'
import Moment from 'react-moment'

export default class ComicShow extends Component {
    constructor(){
          super();
          this.state = {
              comicData: {
                  title:'',
                  thumbnail:'',
                  description:'',
                  releaseDate:''
              }
          }
      }

    componentWillMount(){
        this._fetchComicShowData();
      }
    
    _fetchComicShowData = async() => {
    const publicKey = process.env.REACT_APP_PUBLIC_API_KEY;
    const privateKey = process.env.REACT_APP_PRIVATE_API_KEY;
    const ts = Date.now();
    const hash = md5(ts + privateKey + publicKey)
    const url = `http://gateway.marvel.com/v1/public/comics?id=${this.props.match.params.id}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    
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
            }
        );
            this.setState({comicData: {
            api_id: res.data.data.results[0].id,
            title: res.data.data.results[0].title,
            thumbnail: `${res.data.data.results[0].thumbnail.path}.jpg`,
            description: res.data.data.results[0].description,
            releaseDate: res.data.data.results[0].dates[0].date

        }});
        return res.data

        } catch (err) {
            console.log(err);
        }
    }

    _addComicToCollection = async (e) => {
        e.preventDefault();
        const payload = {
            api_id: this.state.comicData.api_id,
            title: this.state.comicData.title,
            thumbnail: this.state.comicData.thumbnail
        }
        try{
            const res = await axios.post('/api/comics', payload)

        } catch(err) {
            console.log(err);
        }

    }
    render() {
        const comic = this.state.comicData
    return (
      <div>
        <h1><strong>Title</strong>: {comic.title}</h1>
        {comic.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ?
        <img src='https://i.imgur.com/yLppAf3.png'/>:
        <img src={comic.thumbnail}/>}
       
        <p><strong>Description:</strong> {comic.description}</p>
        <p><strong>Release Date:</strong> <Moment format="MM/DD/YYYY">{comic.releaseDate}</Moment></p>
        <button onClick={this._addComicToCollection}>Add Comic</button>
        
      </div>
    )
  }
}

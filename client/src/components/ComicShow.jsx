import React, { Component } from 'react';
import axios from 'axios';
import md5 from 'md5'

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
    const url = `https://gateway.marvel.com/v1/public/comics?id=${this.props.match.params.id}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    
        try {
        const res = await axios.get(url);
        await this.setState({comicData: {
            title: res.data.data.results[0].title,
            thumbnail: `${res.data.data.results[0].thumbnail.path}.jpg`,
            description: res.data.data.results[0].description,
            releaseDate: res.data.data.results[0].dates[0].date

        }});
        await console.log(this.state.comicData)
        return res.data

        } catch (err) {
            console.log(err);
        }
    }
    render() {
        const comic = this.state.comicData
    return (
      <div>
        <h1><strong>Title</strong>: {comic.title}</h1>
        <img src={comic.thumbnail}/>
        <p><strong>Description:</strong> {comic.description}</p>
        <p><strong>Release Date</strong>: {comic.releaseDate}</p>
      </div>
    )
  }
}

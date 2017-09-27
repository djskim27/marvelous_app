import React, { Component } from 'react';
import axios from 'axios';
import md5 from 'md5'
import Moment from 'react-moment'
import styled from 'styled-components'

const ShowPageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    background: rgba(255,255,255,0);
`
const ImgDiv = styled.div`
    img {
        width: 320px;
        height: 495px;
    }
`

const DescriptionDiv = styled.div`
    width: 300px;
    color: white;
    font-family: "Comic Sans MS", cursive, sans-serif;
    
`
export default class UserComicShow extends Component {
    constructor(){
          super();
          this.state = {
              comicData: {
                  title:'',
                  thumbnail:'',
                  description:'',
                  releaseDate:''
              },

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
    const url = `https://gateway.marvel.com/v1/public/comics?id=${this.props.comicId}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    
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

    render() {
        const comic = this.state.comicData
    return (
      <ShowPageContainer>
        
        <ImgDiv>
            {comic.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ?
            <img src='https://i.imgur.com/yLppAf3.png'/>:
            <img src={comic.thumbnail}/>}
        </ImgDiv>
        <DescriptionDiv>
            <p className='comic-title'>{comic.title}</p>
            <p><strong>Description:</strong> {comic.description}</p>
            <p><strong>Release Date:</strong> <Moment format="MM/DD/YYYY">{comic.releaseDate}</Moment></p>
            
            
        </DescriptionDiv>
      </ShowPageContainer>
    )
  }
}

import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'

const ComicCard = styled.div`
margin: 5%;
img {
    width: 200px;
    height: 304px;
    margin: 10px;
    transition: 1s ease;
    border: white 4px solid;
}
img:hover{
    -webkit-transform: scale(1.05) rotateZ(-1deg);
    -ms-transform: scale(1.05) rotateZ(-1deg);
    transform: scale(1.05) rotateZ(-1deg);
    transition: 1s ease;
}
`
const ButtonDiv = styled.div`
    display: flex;
    justify-content: space-around;
`
export default class UserComicCard extends Component {
    constructor(){
        super();
        this.state = {
            redirect: false,
            setBG: false
        }
    }

_deleteComic = async() => {
    try {
        const res = await axios.delete(`/api/comics/${this.props.comic.id}`)
        // this.setState({redirect: true})
        await this.props.fetch();
        return res.data
    }
    catch(err) {
        console.log(err)
    }
}

_changeBackground = () => {
   console.log()
    // this.props.backgroundImage(this.props.comic.thumbnail)
}

_setBG = () => {
    this.setState({setBG: true})
}

  render() {
      const comics = this.props.comic
    return (
    <div>
      <ComicCard>
 
          <img src={this.props.comic.thumbnail}/>
           
       

      </ComicCard>
      <ButtonDiv>
      <button className='btn marvel-btn' onClick={this._deleteComic}>Delete</button>
      <button className='btn marvel-btn' onClick={() => {this.props.backgroundImage(this.props.comic.thumbnail)}}>Set BG</button>
      </ButtonDiv>
      </div>
    )
  }
}


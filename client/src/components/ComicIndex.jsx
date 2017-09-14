import React, { Component } from 'react'
import ComicImageCard from './ComicImageCard'
import styled from 'styled-components'

const ComicContainer = styled.div`
margin-top: 10px;
margin-left: 10%;
margin-right: 10%;
padding: 10px;
display: flex;
flex-wrap: wrap;
justify-content: center;
`

export default class ComicIndex extends Component {
  render() {
    const comics = this.props.comics
    const comicList = comics.map((comic, i) => {
      return(
        
          <ComicImageCard comic = {comic} key={i}/>
    
      )
    })
    return (
      <ComicContainer>
      {comicList}
      </ComicContainer>
    )
  }
}

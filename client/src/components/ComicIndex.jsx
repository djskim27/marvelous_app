import React, { Component } from 'react'
import ComicIndexCard from './ComicIndexCard'
import styled from 'styled-components'

const ComicContainer = styled.div`
background: rgba(255,255,255,0.9);
margin-top: 5%;
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
        
          <ComicIndexCard comic = {comic} key={i}/>
    
      )
    })
    return (
      <ComicContainer>
      {comicList}
      </ComicContainer>
    )
  }
}

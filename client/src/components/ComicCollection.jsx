import React, { Component } from 'react';
import UserComicCard from './UserComicCard';
import Coverflow from 'react-coverflow';
import {StyleRoot} from 'radium';
import styled from 'styled-components';

const ComicDiv = styled.div`

img {
    width: 200px;
    height: 304px;
    margin: 10px;
}
`



export default class ComicCollection extends Component {
  constructor(){
    super();
    this.state = {

    }
  }

  componentWillMount(){
    this.props.fetchUserComicCollection()
  }

  render() {
    const userComicCollection = this.props.userComicCollection
    const userComicList = userComicCollection.map((comic, i) => {
      return <UserComicCard comic={comic} fetch={this.props.fetchUserComicCollection}/>
    })

    return (
      <div>
<StyleRoot>
  <Coverflow
    displayQuantityOfSide={2}
    navigation={true}
    enableHeading={true}
    media={{
      '@media (max-width: 900px)': {
        width: '600px',
        height: '300px'
      },
      '@media (min-width: 900px)': {
        width: '960px',
        height: '600px'
      }
    }}
    >
    {userComicCollection.map((comic, i) => {
      return <ComicDiv><img src={comic.thumbnail}/></ComicDiv>
    })}
  </Coverflow>
  </StyleRoot>
          
      </div>
    )
  }
}

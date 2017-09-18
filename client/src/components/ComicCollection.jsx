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
const ComicListContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
`
const ButtonDiv = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export default class ComicCollection extends Component {
  constructor(){
    super();
    this.state = {
      carouselMode: false
    }
  }

  componentWillMount(){
    this.props.fetchUserComicCollection()
  }
  
  toggleCarouselMode = (e) => {
    e.preventDefault();
    this.setState({carouselMode: !this.state.carouselMode})
  }
  render() {
    const userComicCollection = this.props.userComicCollection
    const userComicList = userComicCollection.map((comic, i) => {
      return <UserComicCard comic={comic} fetch={this.props.fetchUserComicCollection} backgroundImage={this.props.backgroundImage}/>
    })

    return (
      <div>
        
        {this.state.carouselMode? 
        <div>
          <ButtonDiv>
          <button className='btn marvel-btn' onClick={this.toggleCarouselMode}>Normal Mode</button>
          </ButtonDiv>
        <StyleRoot>
          <Coverflow
            displayQuantityOfSide={2}
            navigation={true}
            enableHeading={true}
            media={{
              '@media (max-width: 768px)': {
                width: '300px',
                height: '150px'
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
        :
        <div>
          <ButtonDiv>
          <button className='btn marvel-btn' onClick={this.toggleCarouselMode}>Carousel Mode</button>
          </ButtonDiv>
          <ComicListContainer>
          
          {userComicList}

          </ComicListContainer>
        </div>
        }

      </div>
    )
  }
}

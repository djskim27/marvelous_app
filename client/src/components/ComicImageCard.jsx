import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import ComicShow from './ComicShow'


const ComicCard = styled.div`

img {
    width: 200px;
    height: 304px;
    margin: 10px;
}
`
const customStyles = {
    
    overlay : {
      position          : 'fixed',
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(150, 20, 8, 0.46)'
    },
    content : {
      position                   : 'absolute',
      top                        : '100px',
      left                       : '400px',
      right                      : '400px',
      bottom                     : '100px',
      border                     : '1px solid #ccc',
      background                 : '#fff',
      overflow                   : 'auto',
      WebkitOverflowScrolling    : 'touch',
      borderRadius               : '4px',
      outline                    : 'none',
      padding                    : '20px'
  
    }
  
  
  }

export default class ComicImageCard extends Component {
    constructor(){
        super();
        this.state = {
            isActive: false
        }
    }

    _toggleModal = () => {
        this.setState({
          isActive: !this.state.isActive
        })
      }
   
  render() {
    const comic = this.props.comic;

    return (
        <div>
            {/* <Link to={`/comics/${comic.id}`}> */}
                {comic.thumbnail.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'?
                <ComicCard> <img src={`https://i.imgur.com/yLppAf3.png`} /> </ComicCard>
                :
                <ComicCard> 
                <img src={`${comic.thumbnail.path}.jpg`} onClick={this._toggleModal}/>
                {/* <button onClick={this._toggleModal}>Close Modal</button> */}
                <Modal isOpen={this.state.isActive} style={customStyles} contentLabel="Example Modal">
                
                <ComicShow comicId = {comic.id}/>

                <button onClick={this._toggleModal}>Close Modal</button>
                </Modal>
                </ComicCard>
                }
                
            {/* </Link> */}
        </div>
    )
  }
}

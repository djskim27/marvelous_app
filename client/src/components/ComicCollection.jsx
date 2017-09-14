import React, { Component } from 'react'
import Modal from 'react-modal';

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

export default class ComicCollection extends Component {
    constructor(){
        super();

    }
  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} contentLabel="Example Modal" style={customStyles}>
    
          <button onClick={this.props.toggleModal}>Close Modal</button>
        </Modal>
      </div>
    )
  }
}

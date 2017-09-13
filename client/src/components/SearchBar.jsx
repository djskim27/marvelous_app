import React, { Component } from 'react'

export default class SearchBar extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.searchMarvelData}>
            <div>
              <input onChange={this.props.handleChange} type="text" name="input" value={this.props.input} placeholder="Search For A Comic" />
            </div>
              
            
            <button>Search</button>
        
          </form>
      </div>
    )
  }
}

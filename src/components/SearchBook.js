/*
  This is the Shelf Component for MyReads App

  @author:  Waqas Rehmani
  @date:    20 September 2017
*/

import React, { Component } from 'react'
import '../style/App.css'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

class SearchBook extends Component {

  state = {
    query: ''
  }

  updateQueryAndSearch = (val) => {
    this.setState({ query: val })

    if(this.props.searchBooks){
      this.props.searchBooks(val)
    }
  }

  // Passing the ID from child to parent component
  changeShelf = (bookID, dataFromDropdown) => {

    if (this.props.changeShelf) {
      this.props.changeShelf(bookID, dataFromDropdown, true)
    }
  }

  // Passing the ID from child to parent component
  passID = (bookId) => {

    if (this.props.openPreview){
      this.props.openPreview(bookId)
    }
  }

  render() {
    let booksList

    let headingText
    if (this.state.query.length !== 0){
      headingText = "Showing Results for " + this.state.query
      booksList = this.props.searchedBooks
    } else {
      headingText = ""
      booksList = []
    }

    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>

          <div className="search-books-input-wrapper">

            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQueryAndSearch(event.target.value)}
            />

          </div>
        </div>

        <div className="search-books-results">

          <Shelf
            shelfItems={booksList}
            title={headingText}
            changeShelf={this.changeShelf}
            passID={this.passID}
            isUsedOnSearch={true}
          />

        </div>
      </div>
    )
  }
}

export default SearchBook

/*
  This is the ListBooks Component for MyReads App.
  It is the main view for the current shelves.

  @author:  Waqas Rehmani
  @date:    16 September 2017
*/

import React, { Component } from 'react'
import '../style/App.css'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'


class ListBooks extends Component {


  // Passing the ID from child to parent component
  changeShelf = (bookID, dataFromDropdown) => {

      if (this.props.changeShelf) {
      this.props.changeShelf(bookID, dataFromDropdown, false)
    }
  }

  // Passing the ID from child to parent component
  passID = (bookId) => {

    if (this.props.openPreview){
      this.props.openPreview(bookId)
    }
  }


  render() {
    let currentlyReadingList = this.props.books.filter(b => b.shelf === "currentlyReading")
    let wantToReadList = this.props.books.filter(b => b.shelf === "wantToRead")
    let readList = this.props.books.filter(b => b.shelf === "read")

    return (
      <div className="list-books">

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <Shelf
            shelfItems={currentlyReadingList}
            title="Currently Reading"
            changeShelf={this.changeShelf}
            passID={this.passID}
            isUsedOnSearch={false}
          />

          <Shelf
            shelfItems={wantToReadList}
            title="Want to Read"
            changeShelf={this.changeShelf}
            passID={this.passID}
            isUsedOnSearch={false}
          />

          <Shelf
            shelfItems={readList}
            title="Read"
            changeShelf={this.changeShelf}
            passID={this.passID}
            isUsedOnSearch={false}
          />

        </div>

        <div className="open-search">
          <Link to="/search" >Add a book</Link>
        </div>

      </div>
    )
  }
}

export default ListBooks

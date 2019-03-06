/*
  This is the Shelf Component for MyReads App.
  The Shelf contains all the Books.

  @author:  Waqas Rehmani
  @date:    17 September 2017
*/


import React, { Component } from 'react'
import Book from './Book'
import '../style/App.css'


class Shelf extends Component {

  changeShelf = (bookID, dataFromDropdown) => {

    if (this.props.changeShelf) {
      this.props.changeShelf(bookID, dataFromDropdown)
    }
  }

  passID = (bookId) => {
    if (this.props.passID){
      this.props.passID(bookId)
    }
  }

  render() {

    /* This was used because there was background even when there was
       no text in the heading. So it hides the div. */
    const hiddenHeading = {
      visibility: 'hidden'
    }

    /* This is used to wrap all books instead of showing them in a
       scroll view. */
    const wrapStyle = {
      justifyContent: 'center',
      flexWrap: 'wrap'
    }

    return (
      <div className="bookshelf" >
        <h2 className="bookshelf-title" style={(this.props.title === "") ? hiddenHeading : {}}>{this.props.title}</h2>
        <div className="bookshelf-books" >
          <ol className="books-grid" style={(this.props.isUsedOnSearch) ? wrapStyle : {}}>

            { this.props.shelfItems.map((book) => (
              <li key={book.id}>
                <Book
                  author={book.authors}
                  imageURL={book.imageLinks.thumbnail}
                  title={book.title}
                  shelf={book.shelf}
                  id={book.id}
                  rating={book.averageRating}
                  ratingsCount={book.ratingsCount}
                  changeShelf={this.changeShelf}
                  passID={this.passID}
                />
              </li>
            ))}

          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf

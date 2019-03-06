/*
  This is the App Component for MyReads App
  This is the main component for the MyReads App

  @editor:  Waqas Rehmani
  @date:    16 September 2017
*/

import React from 'react'
import './style/App.css'

import { Route } from 'react-router-dom'
import SearchBook from './components/SearchBook'
import ListBooks from './components/ListBooks'
import BookPreview from './components/BookPreview'
import * as BooksAPI from './utils/BooksAPI'


class BooksApp extends React.Component {
  state = {
    shelfBooks: [],       // The array for the current books
    searchedBooks: [],    // The array for the list of searched books
    isBookPreview: false, // For the modal box. True brings out the box
    previewBook: {}       // The book that that is loaded for BookPreview
  }

  // Get from the server from compnentDidMount
  componentDidMount() {
    BooksAPI.getAll().then(books =>
      this.setState({ shelfBooks: books })
    )

  }

  // The method to search the books
  searchBooks = (searchKey) => {

    if (searchKey){
      BooksAPI.search(searchKey, 10).then((searchResults) => {
        /* To check if the result is array. If the search term is invalid, it
           returns an object instead of a list */

        if (Array.isArray(searchResults)){

          /*The following code block is to make resultant array to account for
            the current shelf books so that it can take the shelf value from
            the cureent shelf books  if the book is already on the shelf */
          let finalSearchResult
          finalSearchResult = searchResults.map( searchedBook => {
            // Create a variable that would be returned
            let resultBook = searchedBook
            // This loop will compare with the current shelf
            this.state.shelfBooks.forEach((shelfBook) => {
              if (shelfBook.id === searchedBook.id) {
                // Assign the shelf to the shelf value of the already present book
                resultBook["shelf"] = shelfBook.shelf
              } else {
                // If it isn't already on the shelf, set it to none
                if (!searchedBook.shelf) {
                  resultBook["shelf"] = "none"
                }
              }
            })
            return resultBook
          })

          return this.setState({ searchedBooks: finalSearchResult })
        } else {
          return this.setState({ searchedBooks: [] })
        }
      })
    } else {
      this.setState({ searchedBooks: [] })
    }

  }


  /* Method to handle the changing of shelves. Takes three params. One is the
     bookID, one is the shelf to be changed to and the third is whether if it
     is called from the SearchBook Component or not. The third param was needed
     as there are two separate lists to choose from
  */
  changeShelf = (bookID, dataFromDropdown, fromSearchWindow) => {

    let tempBook

    //
    if(fromSearchWindow){
      tempBook = this.state.searchedBooks.find((book) => book.id === bookID)

    } else {
      tempBook = this.state.shelfBooks.find((book) => book.id === bookID)

    }

    if (tempBook.shelf !== dataFromDropdown) {
      // Update shelf on the app
      tempBook.shelf = dataFromDropdown
      // Update shelf on the server
      BooksAPI.update(tempBook, dataFromDropdown)

      var tempList = this.state.shelfBooks.filter( (book) => (book.id !== bookID) )
      tempList.push(tempBook)

      this.setState({ shelfBooks: tempList })
    }
  }

  // This function is for the Book Preview Component
  closePreview = () => {
    this.setState({isBookPreview: false})
  }

  openPreview = (bookId) => {
    // Get the book from the server using the id and preview it
    BooksAPI.get(bookId).then(previewBook => {
      console.log(previewBook);
      return this.setState(
        {
          previewBook: previewBook,
          isBookPreview: true
        }
      )
    })

  }


  render() {

    return (
      <div >
        {/* The book preview compoenent which is a modal box */}

        <BookPreview
          open={this.state.isBookPreview}
          previewBook={this.state.previewBook}
          closePreview={this.closePreview}
        />
        {/* The ListBooks compoenent which has the shelves of the books */}
        <Route exact path="/" render={() => (
            <ListBooks
              books={this.state.shelfBooks}
              changeShelf={this.changeShelf}
              openPreview={this.openPreview}
            />
          )}
        />
        {/* The SearchBook compoenent which searches the books */}
        <Route path="/search" render={() => (
            <SearchBook
              searchBooks={this.searchBooks}
              searchedBooks={this.state.searchedBooks}
              changeShelf={this.changeShelf}
              openPreview={this.openPreview}
            />
          )}
        />

      </div>
    )
  }
}

export default BooksApp;

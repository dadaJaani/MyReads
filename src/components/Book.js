/*
  This is the Book Component for MyReads App.
  The Book has all the information it has to display on the shelves.

  @author:  Waqas Rehmani
  @date:    17 September 2017
*/

import React, { Component } from 'react'
import ChangerDropdown from './ChangerDropdown'
import '../style/App.css'


class Book extends Component {
  // Passing the data from the dropdown component to App Component
  changeShelf = (dataFromDropdown) => {
    if (this.props.changeShelf) {
      this.props.changeShelf(this.props.id, dataFromDropdown)
    }
  }

  // Passing the ID to the App Component for the modal box
  passID = () => {
    let bookId = this.props.id

    if (this.props.passID){
      this.props.passID(bookId)
    }
  }
  // Check if the shelf is none. For the red glow identifier.
  isNone = () => {
    return (this.props.shelf === "none")
  }

  render(){
    const { author }       = this.props
    const { title }        = this.props
    const { imageURL }     = this.props
    const { shelf }        = this.props
    const { rating }       = this.props

    let ratingsCount
    if (!this.props.ratingsCount){
      ratingsCount = 0
    } else {
      ratingsCount = this.props.ratingsCount
    }

    const imgStyle = {
      width: 128,
      height: 193,
      backgroundImage: 'url('+ imageURL +')'
    }
    const starStyle = {
      color: `#F24738`
    }

    return (
      <div className="book">

        <div className="book-top">
          {/* The condition checks if the book is currently on any shelf.
              If it is, there is a red glow around it. */}
          <div
            className={"book-cover " + (this.isNone() ? 'null' : 'book-cover2')}
            style={imgStyle}
            onClick={this.passID}
          >
          </div>
          <ChangerDropdown shelf={shelf} changeShelf={this.changeShelf}/>
        </div>
        <div className="book-title-and-authors">
          <div className="book-title" >{title}</div>
          <div className="book-authors" >{author}</div>
        </div>
        {/* The following div creates a block for the rating stars.
            The inspiration for the star rating has been taken from multiple tutorials,
            especially from: https://codepen.io/jamesbarnett/pen/vlpkh */}
        <div className="stars">
          <label className="starFull" style={(rating >= 5) ? starStyle : {}}></label>
          <label className="starHalf" style={(rating >= 4.5) ? starStyle : {}}></label>
          <label className="starFull" style={(rating >= 4) ? starStyle : {}}></label>
          <label className="starHalf" style={(rating >= 3.5) ? starStyle : {}}></label>
          <label className="starFull" style={(rating >= 3) ? starStyle : {}}></label>
          <label className="starHalf" style={(rating >= 2.5) ? starStyle : {}}></label>
          <label className="starFull" style={(rating >= 2) ? starStyle : {}}></label>
          <label className="starHalf" style={(rating >= 1.5) ? starStyle : {}}></label>
          <label className="starFull" style={(rating >= 1) ? starStyle : {}}></label>
          <label className="starHalf" style={(rating >= 0.5) ? starStyle : {}}></label>
        </div>
        <div className="ratings-count">({ratingsCount})</div>
      </div>
    )
  }
}

export default Book

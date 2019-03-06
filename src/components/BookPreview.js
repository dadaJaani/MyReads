/*
  This is the BookPreview Component for MyReads App
  BookPreview is a modal box that pops up whenever a book is clicked on.

  @author:  Waqas Rehmani
  @date:    28 September 2017
*/

import React, { Component } from 'react'
import '../style/App.css'
import Book from './Book'

class BoxPreview extends Component {

  closePreview = (e) => {
    e.preventDefault()
    if (this.props.closePreview){
      this.props.closePreview()
    }
  }

  render(){

    if (!this.props.open){
      return null
    }

    const { title } = this.props.previewBook
    const { subtitle } = this.props.previewBook
    const { description } = this.props.previewBook
    const { authors } = this.props.previewBook
    const { averageRating } = this.props.previewBook
    const { imageLinks } = this.props.previewBook
    const { industryIdentifiers } = this.props.previewBook
    const { language } = this.props.previewBook
    const { maturityRating } = this.props.previewBook
    const { pageCount } = this.props.previewBook
    const { ratingsCount } = this.props.previewBook
    const { publishedDate } = this.props.previewBook
    const { publisher } = this.props.previewBook
    const { shelf } = this.props.previewBook
    const { previewLink } = this.props.previewBook
    const { categories } = this.props.previewBook

    const imgStyle = {
      width: 150,
      height: 226,
      backgroundImage: 'url('+ imageLinks.thumbnail +')'
    }

    const starStyle = {
      color: `#F24738`
    }

    let lang
    let finalDescription  = description
    let finalRatingsCount = ratingsCount

    // Limit the description if it is too large
    if (description && description.length > 360 )
      finalDescription = description.substr(0, 360) + "..."
    else if (!description) // if there no description found
      finalDescription = "- No description found for this book -"

    // If there is no rating count, set it to 0
    if (!ratingsCount)
      finalRatingsCount = 0

    // Display the language according to the language code
    switch (language) {
      case "en":
        lang = "English"
        break;
      case "fr":
        lang = "French"
        break;
      case "de":
        lang = "German"
        break;
      case "it":
        lang = "Italian"
        break;
      case "ar":
        lang = "Arabic"
        break;
      case "zh":
        lang = "Chinese"
        break;
      case "fa":
        lang = "Persian"
        break;
      case "ja":
        lang = "Japanese"
        break;
      case "ko":
        lang = "Korean"
        break;
      case "he":
        lang = "Hebrew"
          break;
      default:
        lang = "Unknown"
    }


    return(
      <div >
        <div className="grey-background" onClick={(e) => this.closePreview(e)}></div>
        <div className="book-preview">
          <div className="book-preview-title"><strong>{title}</strong></div>
          <div className="book-preview-subtitle">{subtitle} <div className="book-preview-authors">- {authors}</div></div>
          <div title="Book Cover" className="book-preview-cover" style={imgStyle}></div>
          <div className="book-preview-infobox">
            <div title={description} className="book-preview-description">{finalDescription}</div>
            <div className="book-preview-category"><strong>{categories.toString()}</strong></div>
            <div className="book-preview-publisher">Language: <strong>{lang}</strong></div>
            <div className="book-preview-publisher">Publisher: <strong>{publisher}</strong></div>
            <div className="book-preview-publish-date">Published date: <strong>{publishedDate}</strong></div>
            
            {/* The following div creates a block for the rating stars.
                The inspiration for the star rating has been taken from multiple tutorials,
                especially from: https://codepen.io/jamesbarnett/pen/vlpkh */}
            <div className="stars">
              <label className="starFull" style={(averageRating >= 5) ? starStyle : {}}></label>
              <label className="starHalf" style={(averageRating >= 4.5) ? starStyle : {}}></label>
              <label className="starFull" style={(averageRating >= 4) ? starStyle : {}}></label>
              <label className="starHalf" style={(averageRating >= 3.5) ? starStyle : {}}></label>
              <label className="starFull" style={(averageRating >= 3) ? starStyle : {}}></label>
              <label className="starHalf" style={(averageRating >= 2.5) ? starStyle : {}}></label>
              <label className="starFull" style={(averageRating >= 2) ? starStyle : {}}></label>
              <label className="starHalf" style={(averageRating >= 1.5) ? starStyle : {}}></label>
              <label className="starFull" style={(averageRating >= 1) ? starStyle : {}}></label>
              <label className="starHalf" style={(averageRating >= 0.5) ? starStyle : {}}></label>
            </div>

            <div className="book-preview-ratings-count">({finalRatingsCount})</div>

            <a href={previewLink} target="_blank" className="book-preview-link">
              Click here to preview the book.
            </a>
          </div>

        </div>
      </div>
    )
  }
}

export default BoxPreview

/*
  This is the ChangerDropdown Component for MyReads App
  This has the dropdown menu on every book on the shelf.

  @author:  Waqas Rehmani
  @date:    17 September 2017
*/

import React from 'react'
import '../style/App.css'

class ChangerDropdown extends React.Component {

  state = {
    selectedShelf: this.props.shelf
  }


  // Passing the ID to parent component to use it to change shelf
  handleChange = (evnt) => {
    this.setState({selectedShelf: evnt.target.value})
    if (this.props.changeShelf){
      this.props.changeShelf(evnt.target.value)
    }
  }

  render(){
    return(
      <div className="book-shelf-changer" >
        <select defaultValue={this.state.selectedShelf}
                onChange={this.handleChange}
        >
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead" >Want to Read</option>
          <option value="read" >Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default ChangerDropdown

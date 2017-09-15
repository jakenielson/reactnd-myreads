import React, { Component } from 'react'

class ShelfChanger extends Component {
  handleChange = (event) => {
    console.log(this.props)
    this.props.moveBook(this.props.book, event.target.value)
  }

  render() {
    const {shelf} = this.props

    return (
      <div className="book-shelf-changer">
        <select value={shelf} onChange={this.handleChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default ShelfChanger

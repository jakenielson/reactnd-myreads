import React, { Component } from 'react'

class ShelfChanger extends Component {
  handleChange = (event) => {
    console.log(event.target.value)
    this.props.getNewShelf(event.target.value)
  }

  render() {
    const {shelf} = this.props

    return (
      <div className="book-shelf-changer">
        <select value={shelf} onChange={this.handleChange}>
          <option value="none" disabled>Move to...</option>
          <option value="Currently Reading">Currently Reading</option>
          <option value="Want to Read">Want to Read</option>
          <option value="Read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default ShelfChanger

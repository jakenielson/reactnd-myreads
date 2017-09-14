import React, { Component } from 'react'
import ShelfChanger from './ShelfChanger'

class Book extends Component {
  getNewShelf = (newShelf) => {
    this.props.getBook(this, newShelf)
  }

  render() {
    const {book, shelf} = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'}}></div>
          <ShelfChanger shelf={shelf} getNewShelf={this.getNewShelf}/>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors[0]}</div>
      </div>
    )
  }
}

export default Book

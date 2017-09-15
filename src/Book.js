import React, { Component } from 'react'
import ShelfChanger from './ShelfChanger'

class Book extends Component {
  render() {
    const {book, shelf, moveBook} = this.props

    let  title, author = 'N/A'
    if (book.title) {title = book.title}
    if (book.authors) {author = book.authors[0]}

    let cover = book.imageLinks ? book.imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover'

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + cover + ')'}}></div>
          <ShelfChanger shelf={shelf} book={book} moveBook={moveBook}/>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{author}</div>
      </div>
    )
  }
}

export default Book

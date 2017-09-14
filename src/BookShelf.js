import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
  getBook = (book, newShelf) => {
    this.props.moveBook(book, this.props.title, newShelf)
  }

  render() {
    const {title, books} = this.props

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} shelf={title} getBook={this.getBook}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf

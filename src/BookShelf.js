import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
  render() {
    const {title, books, moveBook} = this.props
    let formattedTitle

    switch (title) {
      case 'currentlyReading':
        formattedTitle = 'Currently Reading'
        break
      case 'wantToRead':
        formattedTitle = 'Want to Read'
        break
      case 'read':
        formattedTitle = 'Read'
        break
      default:
        formattedTitle = 'Name Error'
        break
    }

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{formattedTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} shelf={book.shelf} moveBook={moveBook}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf

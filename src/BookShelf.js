import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
  addBook = (book) => {
    this.setState({books: this.state.books.concat([book])})
  }

  removeBook = (book) => {
    this.setState({books: this.state.books.filter((b) => b !== book)})
  }

  render() {
    const {title, books} = this.props

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li>
                <Book title={book.title} author={book.author} cover={book.cover}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf

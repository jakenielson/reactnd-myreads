import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  state = {
    query: '',
    searchResults: []
  }

  // Lists the results of the current query
  handleChange = (event) => {
    this.setState({query: event.target.value})

    // Search the Books API
    if (event.target.value) {
      BooksAPI.search(event.target.value, 20).then((results) => {
        // Make sure there's a result
        if (results) {
          // Make sure the result didn't return an error
          if (results.error) {
            console.log('Error: ' + results.error)
          }
          else {
            this.getShelves(results)
          }
        }
      })
    }
    else {
      this.setState({searchResults: []})
    }
  }

  // BooksAPI.search results don't have shelves
  // Give them shelves
  getShelves = (books) => {
    books = books.map((book) => {
      // Default is no shelf
      book.shelf = "none"
      // Check if the book matches a book on our shelves
      for (let i = 0; i < this.props.bookshelves.length; i++) {
        for (let j = 0; j < this.props.bookshelves[i].books.length; j++) {
          if (book.id === this.props.bookshelves[i].books[j].id) {
            // Add shelf
            book.shelf = this.props.bookshelves[i].title
            return book
          }
        }
      }
      return book
    })

    this.setState({searchResults: books})
  }

  render() {
    const {query, searchResults} = this.state
    const {moveBook} = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map((book) => (
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

export default SearchBooks

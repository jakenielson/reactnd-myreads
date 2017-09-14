import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  state = {
    query: '',
    searchResults: []
  }

  handleChange = (event) => {
    this.setState({query: event.target.value.trim()})

    BooksAPI.search(this.state.query, 20).then((results) => {
      // Make sure there's a result
      if (results) {
        // Make sure the result didn't return an error
        if (results.error) {
          console.log('Error: ' + results.error)
        }
        else {
          this.setState({searchResults: results})
          console.log(this.state.searchResults)
        }
      }
    })
  }

  getBook = (book, newShelf) => {
    this.props.moveBook(book, "None", newShelf)
  }

  render() {
    const {searchResults} = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map((book) => (
              <li key={book.id}>
                <Book book={book} shelf="None" getBook={this.getBook}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks

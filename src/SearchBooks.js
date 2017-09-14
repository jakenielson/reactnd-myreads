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
      if (results) {
        if (results.error) {
          console.log('Error: ' + results.error)
        }
        else {
          this.setState({searchResults: results})
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
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map((book) => (
              <li key={book.title}>
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

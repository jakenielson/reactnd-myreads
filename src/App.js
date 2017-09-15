import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    bookshelves: [
      {
        title: 'currentlyReading',
        books: []
      },
      {
        title: 'wantToRead',
        books: []
      },
      {
        title: 'read',
        books: []
      }
    ]
  }

  // Adds a book to a shelf
  // Takes a book object and a target shelf
  // If the book was previously on a different shelf, remove it from that shelf
  moveBook = (book, newShelf) => {
    let {bookshelves} = this.state

    // Remove the book from the current shelf
    bookshelves = bookshelves.map((shelf) => {
      if (shelf.title === book.shelf) {
        shelf.books = shelf.books.filter((b) => {return b.id !== book.id})
      }
      return shelf
    })

    // Change the shelf property of the book
    book.shelf = newShelf

    // Add the book to the new shelf
    bookshelves = bookshelves.map((shelf) => {
      if (shelf.title === newShelf) {
        shelf.books = shelf.books.concat([book])
      }
      return shelf
    })

    // Update the server
    BooksAPI.update(book, book.shelf)

    // Set the state
    this.setState({bookshelves: bookshelves})
  }

  // Gets initial book data
  componentDidMount = () => {
    BooksAPI.getAll().then((result) => {
      let {bookshelves} = this.state

      for(let i = 0; i < result.length; i++) {
        BooksAPI.update(result[i], result[i].shelf)
        switch (result[i].shelf) {
          case 'currentlyReading':
            bookshelves[0].books = bookshelves[0].books.concat([result[i]])
            break
          case 'wantToRead':
            bookshelves[1].books = bookshelves[1].books.concat([result[i]])
            break
          case 'read':
            bookshelves[2].books = bookshelves[2].books.concat([result[i]])
            break
          default:
            break
        }
      }
      this.setState({bookshelves: bookshelves})
    })
  }

  render() {
    let {bookshelves} = this.state

    return (
      <BrowserRouter>
        <div className="app">
          <Route path="/search" render={() => (
            <SearchBooks bookshelves={bookshelves} moveBook={this.moveBook}/>
          )}/>
          <Route exact path="/" render={() => (
            <ListBooks bookshelves={bookshelves} moveBook={this.moveBook}/>
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp

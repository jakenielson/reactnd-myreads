import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    bookshelves: [
      {
        title: 'Currently Reading',
        books: []
      },
      {
        title: 'Want to Read',
        books: []
      },
      {
        title: 'Read',
        books: []
      }
    ]
  }

  moveBook = (book, currentShelf, newShelf) => {
    let {bookshelves} = this.state

    book = book.props.book

    console.log("Moving " + book.title + " from " + currentShelf + " to " + newShelf)

    // Remove the book from currentShelf
    bookshelves = bookshelves.map((shelf) => {
      if (shelf.title === currentShelf) {
        shelf.books = shelf.books.filter((b) => {
          return b.title !== book.title
        })
      }
      return shelf;
    })

    // Add the book to newShelf
    bookshelves = bookshelves.map((shelf) => {
      if (shelf.title === newShelf) {
        shelf.books = shelf.books.concat([book])
      }
      return shelf;
    })

    // Set the state
    this.setState({bookshelves: bookshelves})
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((result) => {
      console.log(result)

      let {bookshelves} = this.state

      for(let i = 0; i < result.length; i++) {
        switch (result[i].shelf) {
          case 'currentlyReading':
            bookshelves[0].books = bookshelves[0].books.concat([result[i]])
            break;
          case 'wantToRead':
            bookshelves[1].books = bookshelves[1].books.concat([result[i]])
            break;
          case 'read':
            bookshelves[2].books = bookshelves[2].books.concat([result[i]])
            break;
          default:
            break;
        }

        this.setState({bookshelves: bookshelves})
      }
    })
  }

  render() {
    let {bookshelves} = this.state

    return (
      <BrowserRouter>
        <div className="app">
          <Route path="/search" render={() => (
            <SearchBooks/>
          )}/>
          <Route exact path="/" render={() => (
            <ListBooks moveBook={this.moveBook} bookshelves={bookshelves}/>
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp

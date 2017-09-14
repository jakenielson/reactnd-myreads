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

    const bookData = {
      title: book.props.title,
      author: book.props.author,
      cover: book.props.cover
    }

    console.log("Moving " + bookData.title + " from " + currentShelf + " to " + newShelf)

    // Remove the book from currentShelf
    bookshelves = bookshelves.map((shelf) => {
      if (shelf.title === currentShelf) {
        shelf.books = shelf.books.filter((b) => {
          return b.title !== bookData.title
        })
      }
      return shelf;
    })

    // Add the book to newShelf
    bookshelves = bookshelves.map((shelf) => {
      if (shelf.title === newShelf) {
        shelf.books = shelf.books.concat([bookData])
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
        const bookData = {
          title: result[i].title,
          author: result[i].authors[0],
          cover: 'url(' + result[i].imageLinks.thumbnail + ')'
        }

        switch (result[i].shelf) {
          case 'currentlyReading':
            bookshelves[0].books = bookshelves[0].books.concat([bookData])
            break;
          case 'wantToRead':
            bookshelves[1].books = bookshelves[1].books.concat([bookData])
            break;
          case 'read':
            bookshelves[2].books = bookshelves[2].books.concat([bookData])
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

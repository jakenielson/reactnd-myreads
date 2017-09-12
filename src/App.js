import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {}

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route path="/search" render={() => (
            <SearchBooks/>
          )}/>
          <Route exact path="/" render={() => (
            <ListBooks/>
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp

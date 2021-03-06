import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import CurrentlyReading from './CurrentlyReading'
import WanttoRead from './WanttoRead'
import Read from './Read'
import ShowsearchpageDetails from './ShowsearchpageDetails'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    console.log('triggered during componentDidMount')
    this.fetchInfo()
  }

  fetchInfo = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  handleBackButtonClick = () => {
    this.fetchInfo()
  }

  handleBookShelfChange = (bookSend, shelf) => {
    BooksAPI.update(bookSend, shelf).then(() => {
      bookSend.shelf = shelf
      this.setState(state => ({
        books: state.books.filter(bk => bk.id !== bookSend.id).concat([bookSend])
      }))
    })
  }

  render() {
    return (
      <BrowserRouter >
        <div  className="app">
          <Route  exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <CurrentlyReading books={this.state.books} onUpdateBookShelf={this.handleBookShelfChange} />
                  <WanttoRead books={this.state.books} onUpdateBookShelf={this.handleBookShelfChange}/>
                  <Read books={this.state.books} onUpdateBookShelf={this.handleBookShelfChange}/>
                </div>
              </div>
            </div>
          )} />
          <Link
            to='/search'
            className='open-search'>
            Add a book
          </Link>

          <Route  exact path='/search' render={() => (
            <ShowsearchpageDetails 
              books={this.state.books}
              onUpdateBookShelf={this.handleBookShelfChange}
              onBackButtonClick={this.handleBackButtonClick}
            />
          )} />
        </div>

      </BrowserRouter>
    )
  }
}

export default BooksApp
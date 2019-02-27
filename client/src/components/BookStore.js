import React, { Component } from "react";
import API from "../util/API";
import DisplayResult from "./DisplayResult";

class BookStore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: [],
      savedBooks: []
    }
  }

  handleBookSearch = (e) => {
    this.setState({ key: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    API.search(this.state.key).then(res => {
      this.processSearchResult(res.data.items);
    }).catch (err => {
      console.log ("error caught " + err);
    })
  }

  handlePrimaryButtonClick = (e) => {
    // view item
   const viewBookURL = e.target.attributes.getNamedItem("data-item").value;
   window.open(viewBookURL);
  }

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getAllSaveBooks()
      .then(res => {
        this.setState({ savedBooks: res.data.map(book => book.bookId) })
      }
    )
    .catch(err => console.log(err));
  };

  handleSecondaryButtonClick = (e) => {
    // save item to mongo
    const id = e.target.attributes.getNamedItem("data-item").value;
    const saveBook = this.state.result.filter(book => book.bookId === id)
    API.save(saveBook[0]).then(res => {
      console.log ("book is saved successfully " + res);

      this.setState((prevState, props) => {
        return prevState.result.map (book => {
          return (book.bookId === id) ? book.displayStatus = false : book.displayStatus = book.displayStatus;
  
        })
      })
   
    }).catch (err => {
      console.log ("book cannot be saved");
    })
  }

  processSearchResult = books => {

    const bookResult = books.map(book => {

      console.log (this.state.savedBooks.indexOf(book.id) < 0);
      return {
        bookId: book.id,
        title: book.volumeInfo.title,
        image: book.volumeInfo.imageLinks.thumbnail,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        link: book.volumeInfo.previewLink,
        displayStatus: this.state.savedBooks.indexOf(book.id) < 0
      }
    });
    this.setState({result: bookResult});
  }

  render() {
    return (
      <div className="bodyContainer">
        <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
             <label className="col-sm-2 col-form-label">Book Title</label>
             <div className="col-sm-10">
              <input type="text" className="form-control" id="inputBookName" placeholder="book title" onChange={this.handleBookSearch} />
            </div>
        </div>
       
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary" id="search" >Search</button>
          </div>
        </div> 
      </form>
      <hr />
      <div className="bookListContainer">
          <DisplayResult 
            resultList={this.state.result} 
            mode="search"
            primaryButtonClick={this.handlePrimaryButtonClick} 
            secondaryButtonClick={this.handleSecondaryButtonClick}
            />
      </div>
      </div>

      
    );
  }
}

export default BookStore;

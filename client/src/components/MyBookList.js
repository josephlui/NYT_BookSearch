import React, { Component } from "react";
import API from "../util/API";
import DisplayResult from "./DisplayResult";

class MyBookList extends Component {


    constructor(props) {
        super(props);
        this.state = {
          result: []
        }
    }

    componentDidMount() {
        this.loadBooks();
      }
    
    loadBooks = () => {
        API.getAllSaveBooks()
          .then(res => {
              const bookListWithStatus = res.data.map (book => { return {...book , displayStatus: true }});
            this.setState({ result: bookListWithStatus })
          }
            )
          .catch(err => console.log(err));
    };
    

    handlePrimaryButtonClick = (e) => {
        // view item
       const viewBookURL = e.target.attributes.getNamedItem("data-item").value;
       window.open(viewBookURL);
    }

    handleSecondaryButtonClick = (e) => {
        // remove item to mongo
        const id = e.target.attributes.getNamedItem("data-item").value;
        API.remove(id).then(res => {
            
            this.setState({ result: this.state.result.filter(book => book.bookId !== id)});
         
        }).catch (err => {
          console.log ("book cannot be removed");
        })
      }

    render() {
    return (
     <div>
      <hr />
      <div className="bookListContainer">
          <DisplayResult 
            resultList={this.state.result} 
            mode="save"
            primaryButtonClick={this.handlePrimaryButtonClick} 
            secondaryButtonClick={this.handleSecondaryButtonClick}
            />
      </div>
     </div>
    )
    }
}

export default MyBookList;
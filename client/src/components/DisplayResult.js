import React from "react";


function render(props) {

    if (props.resultList){
      return (
        props.resultList.map(book => {
          return <div className="media" key={book.bookId}>
          <img src={book.image} className="align-self-center mr-3" alt={book.title} />
          <div className="media-body">
            <h5 className="mt-0">{book.title}</h5>
            <p>Authors: {book.authors.join(', ')}</p>
            <p>{book.description}</p>
            <p>
              <button type="button" className="btn btn-primary btn-sm" data-item={book.link} onClick={props.primaryButtonClick}>View</button>
              {book.displayStatus &&
              <button type="button" className="btn btn-secondary btn-sm" data-item={book.bookId} onClick={props.secondaryButtonClick}>
                  {(props.mode === 'search') ? 'Save' : 'Delete'}
                  </button> 
              }
              
            </p>
          </div>
          </div>
        })
      );
    } else {
      return <div></div>
    }

   
}


export default render;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";
import Book from "./Book";
import PropTypes from "prop-types";

export default function Search({ myBooks, onUpdateBook }) {
  const [query, setQuery] = useState("");
  const [resultBooks, setResultBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query === "" || query.trim() === "") {
      setResultBooks([]);
      return;
    }
    setIsLoading(true);
    search(query, 10).then((res) => {
      setResultBooks(res);
      setIsLoading(false);
    });
  }, [query]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        {!isLoading && resultBooks.length > 0 ? (
          <ol className="books-grid">
            {resultBooks.map((b) => {
              let foundBooks = myBooks.filter((myB) => myB.id === b.id);
              if (foundBooks.length > 0) {
                let editedBook = b;
                editedBook.shelf = foundBooks[0].shelf;
                return (
                  <li key={b.id}>
                    <Book book={editedBook} onUpdateBook={onUpdateBook} />
                  </li>
                );
              } else {
                b.shelf = undefined;
                return (
                  <li key={b.id}>
                    <Book book={b} onUpdateBook={onUpdateBook} />
                  </li>
                );
              }
            })}
          </ol>
        ) : (
          !isLoading &&
          query.length > 0 && (
            <p style={{ textAlign: "center" }}>Nothing found.</p>
          )
        )}
        {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      </div>
    </div>
  );
}

Search.propTypes = {
  myBooks: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};

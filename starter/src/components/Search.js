import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";
import Book from "./Book";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";

export default function Search({ myBooks, onUpdateBook }) {
  const [query, setQuery] = useState("");
  const [resultBooks, setResultBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const debouncedSearch = useCallback( // eslint-disable-line react-hooks/exhaustive-deps
    debounce((q) => setSearchVal(q), 750),
    []
  );

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    debouncedSearch(q);
  };

  useEffect(() => {
    //also prevents request and error on initial page load
    if (searchVal === "" || searchVal.trim() === "") {
      setResultBooks([]);
      return;
    }
    setIsLoading(true);
    search(searchVal, 10).then((res) => {
      setResultBooks(res);
      setIsLoading(false);
    });
  }, [searchVal]);

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
            onChange={handleChange}
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
          searchVal.trim().length > 0 && (
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

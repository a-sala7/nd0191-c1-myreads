import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { search, getAll } from "../BooksAPI";
import Book from "./Book";

export default function Search() {
  const [myBooks, setMyBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [resultBooks, setResultBooks] = useState([]);

  //on page load
  useEffect(() => {
    getAll().then((res) => setMyBooks(res));
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      return;
    }
    search(query, 10).then((res) => setResultBooks(res));
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
        {resultBooks.length > 0 && (
          <ol className="books-grid">
            {resultBooks.map((b) => {
              let matchingBooks = myBooks.filter((myB) => myB.id === b.id);
              if (matchingBooks.length) {
                b.shelf = matchingBooks[0].shelf;
              }
              return (
                <li key={b.id}>
                  <Book book={b} />
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}

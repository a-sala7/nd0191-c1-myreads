import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";
import { getAll } from "../BooksAPI";

export default function Home() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getAll().then((res) => {
      setBooks(res);
    });
  }, []);
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {books.length === 0 ? (
          <h3 style={{ textAlign: "center", marginTop: "25px" }}>Loading...</h3>
        ) : (
          <div>
            <Bookshelf
              title="Currently Reading"
              books={books.filter((b) => b.shelf === "currentlyReading")}
            />
            <Bookshelf
              title="Want to Read"
              books={books.filter((b) => b.shelf === "wantToRead")}
            />
            <Bookshelf
              title="Read"
              books={books.filter((b) => b.shelf === "read")}
            />
          </div>
        )}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

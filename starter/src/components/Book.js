import React from "react";

export default function Book({ book }) {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            backgroundImage: `url("${book.imageLinks.thumbnail}")`,
            width: "100%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="book-shelf-changer">
          <select value={book.shelf}>
            {book.shelf === null ? (
              <option value="none" disabled>
                Add to...
              </option>
            ) : (
              <option value="none" disabled>
                Move to...
              </option>
            )}
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors.join(", ")}</div>
    </div>
  );
}

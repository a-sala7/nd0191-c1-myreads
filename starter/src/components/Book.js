import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

//I passed existing shelves const as a prop from
// Home.js instead of making a different one here
export default function Book({ book, onUpdateBook, shelves }) {
  const [height, setHeight] = useState("0px");
  useEffect(() => {
    if (book.imageLinks === undefined) {
      return;
    }
    const img = new Image();
    img.addEventListener("load", () => {
      const str = img.naturalHeight.toString() + "px";
      setHeight(str);
    });
    img.src = book.imageLinks.thumbnail;

    return () => {
      img.removeEventListener("load", null);
    };
  }, [book.imageLinks]);

  const handleUpdateBook = (e) => {
    onUpdateBook(book, e.target.value);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            backgroundImage: `Url("${
              book.imageLinks !== undefined ? book.imageLinks.thumbnail : "none"
            }")`,
            //width is always 128px so we just hardcode it
            width: "128px",
            height: height,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={book.shelf !== undefined ? book.shelf : "none"}
            onChange={handleUpdateBook}
          >
            {book.shelf === undefined ? (
              <option disabled>Add to...</option>
            ) : (
              <option disabled>Move to...</option>
            )}
            {shelves.map((s) => {
              return <option value={s.id}>{s.title}</option>;
            })}
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">
        {book.title}
        {book.subtitle && `: ${book.subtitle}`}
      </div>
      {book.authors !== undefined && (
        <div className="book-authors">{book.authors.join(", ")}</div>
      )}
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
  shelves: PropTypes.array.isRequired,
};

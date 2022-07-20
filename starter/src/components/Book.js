import React, { useEffect } from "react";
import { useState } from "react";

export default function Book({ book }) {
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    const img = new Image();
    img.addEventListener("load", () => {
      const str = img.naturalHeight.toString() + "px";
      setHeight(str);
    });
    img.src = book.imageLinks.thumbnail;

    return () => {
      img.removeEventListener("load", null);
    };
  }, [book.imageLinks.thumbnail]);

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            backgroundImage: `url("${book.imageLinks.thumbnail}")`,
            //width is always 128px so we just hardcode it
            width: "128px",
            height: height,
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

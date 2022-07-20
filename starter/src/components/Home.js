import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";

export default function Home({ books, onUpdateBook }) {
  const shelves = [
    {
      id: "currentlyReading",
      title: "Currently Reading",
    },
    {
      id: "wantToRead",
      title: "Want to Read",
    },
    {
      id: "read",
      title: "Read",
    },
  ];

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
            {shelves.map((shelf) => {
              return (
                <Bookshelf
                  key={shelf.id}
                  title={shelf.title}
                  books={books.filter((b) => b.shelf === shelf.id)}
                  onUpdateBook={onUpdateBook}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

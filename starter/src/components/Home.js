import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";
import PropTypes from "prop-types";

export default function Home({ books, onUpdateBook, loading }) {
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
        {loading ? (
          <p style={{ textAlign: "center", marginTop: "25px" }}>Loading...</p>
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

Home.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

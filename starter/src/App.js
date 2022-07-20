import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import NotFound from "./components/NotFound";
import { getAll, update } from "./BooksAPI";
import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(false);

  const getBooks = () => {
    setBooksLoading(true);
    getAll().then((res) => {
      setBooks(res);
      setBooksLoading(false);
    });
  };

  useEffect(() => {
    getBooks();
  }, []);

  const updateBook = (book, shelf) => {
    update(book, shelf).then(() => {
      getBooks();
    });
  };

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              books={books}
              onUpdateBook={updateBook}
              loading={booksLoading}
            />
          }
        />
        <Route
          exact
          path="/search"
          element={<Search myBooks={books} onUpdateBook={updateBook} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

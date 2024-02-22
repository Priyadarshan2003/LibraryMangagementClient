import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);

  const [filterTitle, setFilterTitle] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterPublishDate, setFilterPublishDate] = useState("");
  const [filterGenre, setFilterGenre] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/books");
      const bookData = await response.json();
      setBooks(bookData);
      setFilteredBooks(bookData);
    };

    fetchData();
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const filterBooks = () => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
        book.author.toLowerCase().includes(filterAuthor.toLowerCase()) &&
        book.subject.toLowerCase().includes(filterSubject.toLowerCase()) &&
        book.publishdate
          .toLowerCase()
          .includes(filterPublishDate.toLowerCase()) &&
        book.genre.toLowerCase().includes(filterGenre.toLowerCase())
    );

    setFilteredBooks(filtered);
    setCurrentPage(1);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Library Management System</h1>

      {/* Filter Inputs */}
      <div className="mb-4">
        <label>Title:</label>
        <input
          type="text"
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
        />
        <label className="ml-3">Author:</label>
        <input
          type="text"
          value={filterAuthor}
          onChange={(e) => setFilterAuthor(e.target.value)}
        />
        <label className="ml-3">Subject:</label>
        <input
          type="text"
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
        />
        <label className="ml-3">Publish Date:</label>
        <input
          type="text"
          value={filterPublishDate}
          onChange={(e) => setFilterPublishDate(e.target.value)}
        />
        <label className="ml-3">Genre:</label>
        <input
          type="text"
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
        />
        <button className="btn btn-primary ml-3" onClick={filterBooks}>
          Filter
        </button>
      </div>

      {/* Result Count */}
      <p className="mb-3">{`Results: ${filteredBooks.length}`}</p>

      {/* Book List */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Subject</th>
            <th>Publish Date</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.subject}</td>
              <td>{formatDate(book.publishdate)}</td>{" "}
              <td>{book.genre}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <ul className="pagination">
        {Array.from(
          { length: Math.ceil(filteredBooks.length / booksPerPage) },
          (_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default App;

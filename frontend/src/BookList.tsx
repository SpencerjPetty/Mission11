import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalNumBooks, setTotalNumBooks] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('title');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        { credentials: 'include' }
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalNumBooks(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, sortBy, sortOrder]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">All Books</h1>
      <div className="row justify-content-center">
        {books.map((book) => (
          <div className="col-md-6 col-lg-4 mb-4 d-flex" key={book.bookId}>
            <div className="card h-100 shadow-sm w-100 text-center p-3">
              <div className="card-body">
                <h5 className="card-title text-wrap">{book.title}</h5>
                <ul className="list-unstyled text-start">
                  <li>
                    <strong>Author:</strong> {book.author}
                  </li>
                  <li>
                    <strong>Publisher:</strong> {book.publisher}
                  </li>
                  <li>
                    <strong>ISBN:</strong> {book.isbn}
                  </li>
                  <li>
                    <strong>Classification:</strong> {book.classification}
                  </li>
                  <li>
                    <strong>Category:</strong> {book.category}
                  </li>
                  <li>
                    <strong>Page Count:</strong> {book.pageCount}
                  </li>
                  <li>
                    <strong>Price:</strong> ${book.price.toFixed(2)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center my-3">
        <button
          className="btn btn-primary me-2"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`btn btn-outline-primary mx-1 ${pageNum === index + 1 ? 'active' : ''}`}
            onClick={() => setPageNum(index + 1)}
            disabled={pageNum === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-primary ms-2"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      <div className="row g-2 align-items-center">
        <div className="col-auto">
          <label className="form-label">Sort by:</label>
        </div>
        <div className="col-auto">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPageNum(1);
            }}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
            <option value="price">Price</option>
          </select>
        </div>

        <div className="col-auto">
          <label className="form-label">Order:</label>
        </div>
        <div className="col-auto">
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPageNum(1);
            }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="col-auto">
          <label className="form-label">Results per page:</label>
        </div>
        <div className="col-auto">
          <select
            className="form-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value));
              setPageNum(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default BookList;

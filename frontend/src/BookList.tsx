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
    <>
      <h1>All Books</h1>
      <br />
      {books.map((book) => (
        <div id="bookCard" className="card" key={book.bookId}>
          <h2 className="card-title">{book.title}</h2>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {book.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {book.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {book.isbn}
              </li>
              <li>
                <strong>Classification: </strong>
                {book.classification}
              </li>
              <li>
                <strong>Category: </strong>
                {book.category}
              </li>
              <li>
                <strong>Page Count: </strong>
                {book.pageCount}
              </li>
              <li>
                <strong>Price: </strong> ${book.price.toFixed(2)}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
          className={pageNum === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <label>Sort by: </label>
      <select
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          setPageNum(1); // Reset to first page
        }}
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="publisher">Publisher</option>
        <option value="price">Price</option>
      </select>

      <label>Order: </label>
      <select
        value={sortOrder}
        onChange={(e) => {
          setSortOrder(e.target.value);
          setPageNum(1); // Reset to first page
        }}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <label>Results per page:</label>
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(parseInt(e.target.value));
          setPageNum(1);
        }}
      >
        <option value="5">5</option>
        <option selected value="10">
          10
        </option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </>
  );
}

export default BookList;

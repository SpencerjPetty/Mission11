import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalNumBooks] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('title');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [subtotal, setSubtotal] = useState<number>(0);
  const { addToCart, getCartSubtotal } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleAddToCart = (book: Book) => {
    const newItem: CartItem = {
      bookID: Number(book.bookID),
      title: book.title || 'No title found',
      price: Number(book.price),
      quantity: 1,
    };
    addToCart(newItem);
    setSubtotal(getCartSubtotal()); // Get updated subtotal after adding the item
    setShowToast(true); // Show the toast
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  };

  useEffect(() => {
    // Update subtotal whenever cart changes
    setSubtotal(getCartSubtotal());
  }, [getCartSubtotal]); // Depend on getCartSubtotal so it updates on cart change

  const handleToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  };

  // Ensure the toast is shown after the subtotal is updated
  useEffect(() => {
    if (subtotal > 0) {
      handleToast();
    }
  }, [subtotal]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          sortBy,
          sortOrder,
          selectedCategories
        );

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortBy, sortOrder, selectedCategories, totalNumBooks]);

  if (loading) {
    return <div>Loading books...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">All Books</h1>
      <div className="row justify-content-center d-flex">
        {books.map((book) => (
          <div className="col-auto mb-4" key={book.bookID}>
            <div className="card h-100 shadow-sm text-center p-3 w-100">
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

                <button
                  className="btn btn-success"
                  onClick={() => {
                    handleAddToCart(book);
                    setSubtotal(getCartSubtotal()); // Ensure subtotal is updated
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        totalNumBooks={totalNumBooks}
        onPageChange={(newPage) => setPageNum(newPage)}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />

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
      </div>

      {showToast && (
        <div
          className="position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 1050 }}
        >
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto">Cart Update</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">
              <p>Item added to cart!</p>
              <p>Updated subtotal: ${subtotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;
